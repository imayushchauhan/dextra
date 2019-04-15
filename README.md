# dextra

1. Go to root directory
2. Run npm install
3. Run npm start
4. On App start, processUsersJsonFile() function is called in routes which is responsible for reading data from users.json file and eventually, send user data into the mongodb.
5. Get User List Api is used to retrieve user list from mongodb:-
   ApiUrl: 
   localhost:3000/user/list?skip=0&limit=500&sortingKey=-createdOn
   Method: 
   Post
   Content-Type: 
   application/json
   Body: 
   {"status": "complete"}  
   Response:
   {
    "data": {
        "userCount": 10,
        "userList": [
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            -102.552784,
                            23.634501
                        ]
                    },
                    "formattedAddress": "NA"
                },
                "firstName": "Jen",
                "lastName": "Gret",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb4148e4ea10335447bde52",
                "updatedOn": "2017-04-24T01:15:20.463Z",
                "createdOn": "2017-04-24T01:13:54.699Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            -102.552784,
                            23.634501
                        ]
                    },
                    "formattedAddress": "NA"
                },
                "firstName": "Jen",
                "lastName": "Gret",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb44c426b1ff74784db7a3f",
                "updatedOn": "2017-04-24T01:15:20.463Z",
                "createdOn": "2017-04-24T01:13:54.699Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            79.5940544,
                            17.9689008
                        ]
                    },
                    "formattedAddress": "Telangana 506002, India"
                },
                "firstName": "Cody",
                "lastName": "Achi",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb4148d4ea10335447bde20",
                "updatedOn": "2017-04-23T17:38:42.991Z",
                "createdOn": "2017-04-23T17:35:58.359Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            79.5940544,
                            17.9689008
                        ]
                    },
                    "formattedAddress": "Telangana 506002, India"
                },
                "firstName": "Cody",
                "lastName": "Achi",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb44c426b1ff74784db7a0d",
                "updatedOn": "2017-04-23T17:38:42.991Z",
                "createdOn": "2017-04-23T17:35:58.359Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            106.822745,
                            -6.1744651
                        ]
                    },
                    "formattedAddress": "RT.5/RW.2, Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110, Indonesia"
                },
                "firstName": "Chip",
                "lastName": "Wiser",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb4148e4ea10335447bdf55",
                "updatedOn": "2017-04-23T14:57:54.381Z",
                "createdOn": "2017-04-23T14:54:48.200Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            106.822745,
                            -6.1744651
                        ]
                    },
                    "formattedAddress": "RT.5/RW.2, Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110, Indonesia"
                },
                "firstName": "Chip",
                "lastName": "Wiser",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb44c426b1ff74784db7b42",
                "updatedOn": "2017-04-23T14:57:54.381Z",
                "createdOn": "2017-04-23T14:54:48.200Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            76.3868797,
                            30.3397809
                        ]
                    },
                    "formattedAddress": "147001, India"
                },
                "firstName": "Ira",
                "lastName": "Zupp",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb4148e4ea10335447be187",
                "updatedOn": "2017-05-22T16:59:33.080Z",
                "createdOn": "2017-04-23T08:35:45.878Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            76.3868797,
                            30.3397809
                        ]
                    },
                    "formattedAddress": "147001, India"
                },
                "firstName": "Ira",
                "lastName": "Zupp",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb44c436b1ff74784db7d74",
                "updatedOn": "2017-05-22T16:59:33.080Z",
                "createdOn": "2017-04-23T08:35:45.878Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            78.1197754,
                            9.9252007
                        ]
                    },
                    "formattedAddress": "Madurai, Tamil Nadu 625001, India"
                },
                "firstName": "Reanne",
                "lastName": "O'Shea",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb4148d4ea10335447bdda5",
                "updatedOn": "2017-04-23T06:59:35.325Z",
                "createdOn": "2017-04-23T06:50:12.310Z"
            },
            {
                "googleLocation": {
                    "loc": {
                        "coordinates": [
                            78.1197754,
                            9.9252007
                        ]
                    },
                    "formattedAddress": "Madurai, Tamil Nadu 625001, India"
                },
                "firstName": "Reanne",
                "lastName": "O'Shea",
                "status": "complete",
                "phoneVerified": false,
                "emailVerified": false,
                "isActive": 1,
                "isDeleted": 0,
                "_id": "5cb44c426b1ff74784db7992",
                "updatedOn": "2017-04-23T06:59:35.325Z",
                "createdOn": "2017-04-23T06:50:12.310Z"
            }
        ]
    },
        "message": "User list fetched successfully",
        "code": 200
    } 

6. Mongo url and Redis url can be changed in development.json file under config directory.