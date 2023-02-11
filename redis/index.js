const redis = require('redis');


(async function() {
    //创建客户端
    const redisClient = redis.createClient(6379, '127.0.0.1');

    //链接
    await redisClient.connect()
    .then(() => console.log('redis connect success !'))
    .catch(console.error);

    //set
    await redisClient.set('myname', 'zhangsan123');

    //get
    const myname = await redisClient.get('myname');
    console.log('myname', myname);

    redisClient.quit();
})()
