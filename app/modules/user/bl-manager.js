const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');
const StreamArray = require('stream-json/streamers/StreamArray');
const GoogleMapsAPI = require('googlemaps');

require('./user');
const User = Mongoose.model('User');
const Utility = require('../../libs/utils');
const Constants = require('../../libs/constants');

class UserBLManager {
    processUsersJsonFile() {
        
        let userList = [];
        const jsonStream = StreamArray.withParser();
        const filename = path.join(__dirname, 'users.json');
        
        fs.createReadStream(filename).pipe(jsonStream.input);

        jsonStream.on('data', (data) => {
            let user = new User(data.value);
            user.createdOn = data.value.createdOn;
            user.updatedOn = data.value.updatedOn;
            userList.push(user);
            if(data.key % 500 == 0) {
                User.bulkInsert(userList);
                userList = [];
            }
        });

        jsonStream.on('end', () => {
            console.log('All done');
        });        
    }

    async getUserList(requestQuery, requestBody) {
        let skip = 0;
        if(requestQuery.skip)
            skip = requestQuery.skip;

        let limit = 0;
        if(requestQuery.limit)
            limit = requestQuery.limit;

        let sortingKey = '';
        if(requestQuery.sortingKey)
            sortingKey = requestQuery.sortingKey;

        let getUserListResponse = {};
        try {
            getUserListResponse['userCount'] = await User.getUserCount(requestBody, skip, limit);
            getUserListResponse['userList'] = await User.getUser(requestBody, skip, limit, sortingKey);           
            
            getUserListResponse['userList'] = await this.getFormattedAddress(getUserListResponse['userList']);
        } catch (err) {
            console.log(err)
            return Utility.getResponseObject(null, Constants.MSG.UNABLE_TO_GET_USER_LIST, Constants.CODE.ERROR_RESPONSE_CODE);
        }

        return Utility.getResponseObject(getUserListResponse, Constants.MSG.USER_LIST_FETCHED_SUCCESSFULLY, Constants.CODE.SUCCESS_RESPONSE_CODE);
    }

    reverseGeocode(gmAPI, params) {
        return new Promise((resolve, reject) => {
            gmAPI.reverseGeocode(params, function(err, res){
                if (err)
                    reject(err);

                resolve(res);
            });
        });
    }

    async getFormattedAddress(userList) {
        const gmAPI = new GoogleMapsAPI({
            key: 'AIzaSyDwf78g1PU6QlwfC-wmWMYOQEf4ZegLK_A',
            stagger_time: 1000,
            encode_polylines: false,
            secure: true
        });
        
        let reverseGeocodeParams = {
            "result_type":   "postal_code",
            "language":      "en",
            "location_type": "APPROXIMATE"
        };
        
        let formattedAddresses = [];
        for(let userIndex = 0;userIndex < userList.length;userIndex++) {              
            formattedAddresses.push(Utility.getValuefromRedisKey(userList[userIndex]._id.toString()));                        
        }

        formattedAddresses = await Promise.all(formattedAddresses);
        
        let reverseGeoCodes = [];        
        for(let formattedAddressIndex = 0;formattedAddressIndex < formattedAddresses.length;formattedAddressIndex++){
            if(formattedAddresses[formattedAddressIndex] == null && userList[formattedAddressIndex].googleLocation.loc.coordinates[0] != null && userList[formattedAddressIndex].googleLocation.loc.coordinates[1] != null) {
                reverseGeocodeParams['latlng'] = userList[formattedAddressIndex].googleLocation.loc.coordinates[1] + "," + userList[formattedAddressIndex].googleLocation.loc.coordinates[0];                
                reverseGeoCodes.push(this.reverseGeocode(gmAPI, reverseGeocodeParams));
            }
        }
        
        reverseGeoCodes = await Promise.all(reverseGeoCodes);        

        let reverseGeoCodeCount = 0;
        for(let userIndex = 0;userIndex < userList.length;userIndex++){
            if(userList[userIndex].googleLocation.loc.coordinates[0] == null || userList[userIndex].googleLocation.loc.coordinates[1] == null)
                continue;                
            
            if(formattedAddresses[userIndex] == null) {
                if(reverseGeoCodes[reverseGeoCodeCount].results.length > 0){
                    userList[userIndex].googleLocation.formattedAddress = reverseGeoCodes[reverseGeoCodeCount].results[0].formatted_address;
                    Utility.setValueInRedisKey(userList[userIndex]._id.toString(), reverseGeoCodes[reverseGeoCodeCount].results[0].formatted_address);
                }
                else{
                    userList[userIndex].googleLocation.formattedAddress = "NA";
                    Utility.setValueInRedisKey(userList[userIndex]._id.toString(), "NA")
                }
                reverseGeoCodeCount++;
            }
            else {
                userList[userIndex].googleLocation.formattedAddress = formattedAddresses[userIndex].toString();
            }
        }

        return userList;
    }
}

module.exports = UserBLManager;