module.exports = {
    redisClient: undefined,

    getResponseObject: function (responseData, message, code) {
        return {
            data: responseData,
            message: message,
            code: code
        };
    },

    setRedisClient: function(client){
        redisClient = client;
    },

    getRedisClient: function(){
        return redisClient;
    },

    setValueInRedisKey: function(key, value){
        redisClient.set(key, value, 'EX', 3600);
    },

    getValuefromRedisKey: function(key){
        return new Promise((resolve, reject) => {
            redisClient.get(new Buffer(key), function (err, res) {
                if(err)
                    reject(err);
                                
                resolve(res);    
            });
        });
    }
};