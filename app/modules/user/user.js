const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    status: {type: String, enum: ['unregistered', 'complete'], default: 'unregistered'},
    phoneVerified: {type: Boolean, default: false},
    emailVerified: {type: Boolean, default: false},
    googleLocation: {
        formattedAddress: {type: String, default: ''},
        loc: {
            coordinates: [
                {type: Number, default: 0},
                {type: Number, default: 0}
           ]
        }
    },
    createdOn: {type: Date, default: Date.now},
    updatedOn: {type: Date, default: Date.now},
    isActive: {type: Number, default: 1},
    isDeleted: {type: Number, default: 0}
});

UserSchema.method({
    saveUser: function () {
        return this.save();
    }
});

UserSchema.static({
    bulkInsert: function(userList){
        return this.collection.insert(userList);
    },
    getUser: function (queryObj, offset, limit, sortingKey) {
        return this.find(queryObj).skip(parseInt(offset)).limit(parseInt(limit)).sort(sortingKey).exec();
    },
    getUserCount: function (queryObj, offset, limit) {
        return this.count(queryObj).skip(parseInt(offset)).limit(parseInt(limit)).exec();
    }
});

/**
 * Register schema
 */
Mongoose.model('User', UserSchema);