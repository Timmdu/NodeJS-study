const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

(async function () {
    //链接
    await redisClient.connect()
        .then(() => console.log('redis connect success !'))
        .catch(console.error);

})()

//Set
async function set(key, value) {
    let objVal;
    if (typeof value === 'object') {
        objVal = JSON.stringify(value)
    } else {
        objVal = value;
    }


    await redisClient.set(key, objVal);
}

//Get
async function get(key) {
    try {
        let value = await redisClient.get(key);
        if (value === null) return value;
        try {
            value = JSON.parse(value);
        } catch (err) { }

        return value;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    get,
    set
}
