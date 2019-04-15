const UserBLManager = require('./bl-manager');

class UserController {
    processUsersJsonFile() {
        const userBLManager = new UserBLManager();
        userBLManager.processUsersJsonFile();
    }

    async getUserList(req) {
        const userBLManager = new UserBLManager();
        return await userBLManager.getUserList(req.query, req.body);
    }
}

module.exports = UserController;