const UserRoutes = require('./user');

class AppRouter {
    constructor() {
        this.userRoutes = new UserRoutes();
    }

    attachRoutes(router) {
        this.userRoutes.attachRoutes(router);
        this.userRoutes.processUsersJsonFile();
    }
}

module.exports = AppRouter;