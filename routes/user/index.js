const UserController = require('../../app/modules/user');

class UserRoutes {
    attachRoutes(router) {
        router.post("/user/list", this.getUserList);
    }

    processUsersJsonFile() {
        const userController = new UserController();
        userController.processUsersJsonFile();
    }

    async getUserList(req, res) {
        const userController = new UserController();
        res.send(await userController.getUserList(req));
    }
}

module.exports = UserRoutes;