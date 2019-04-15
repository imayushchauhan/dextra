const Express = require('express');
const Config = require('config');
const Mongoose = require('mongoose');
const Router = require('router');
const BodyParser = require('body-parser');
const appRoot = require('app-root-path');
const Redis = require("redis");
const AppRouter = require('../routes');
const Utility = require('./libs/utils');

class App {
    constructor() {
        this.app = Express();
        this.app.use(BodyParser.json({limit: '50mb'}));
        this.router = Router();
        this.app.use(this.router);
        this.env = process.env.NODE_ENV || 'development';
        this.port = Config.get(this.env + '.appConfig.port');
    }

    async startServer() {
        await this.app.listen(this.port, () => console.log(`App listening on port ${this.port}!!!`))
    }

    attachRoutes() {
        let appRouter = new AppRouter();
        appRouter.attachRoutes(this.router);
    }

    async connectDatabases() {
        const mongoUrl = Config.get(this.env + '.dbConfig.mongoUrl');
        const redisUrl = Config.get(this.env + '.dbConfig.redisUrl');
        await this.connectMongo(mongoUrl);
        const redisClient = await this.connectRedis(redisUrl);
        Utility.setRedisClient(redisClient);
    }

    connectMongo(url) {
        return new Promise((resolve, reject) => {
            Mongoose.connect(url, function (err, res) {
                if (err)
                    reject(err);

                resolve(res);
            });
        });
    }

    async connectRedis(url) {
        return await Redis.createClient(url)
    }
}

module.exports = App;