const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'myblog';

MongoClient.connect(url, {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error("mongodb connect error", err);
        return
    }

    //连接成功
    console.log('mongodb connect success');

    //切换到数据库 - 控制台 use myblog
    const db = client.db(dbName);

    // 使用集合- 控制台 use users
    const usersCollection = db.collection('users');

    //新增
    // usersCollection.insertOne({
    //     username: 'timdu',
    //     password: '123',
    //     realname: 'DXD1'
    // }).then(result => {
    //     console.log('插入成功', result);
    // })

    //更新
    // usersCollection.updateMany({
    //     username: 'timdu'
    // }, {
    //     $set: { realname: '杜晓东' }
    // }).then(result => {
    //     console.log('更新成功', result);
    // });

    //删除
    // usersCollection.deleteMany({
    //     username: 'timdu'
    // }).then(result => {
    //     console.log('删除成功', result);
    // })

    //查询users里面所有集合
    // usersCollection.find({
    //     // username:'zhangsan',
    //     //password: '22'
    // }).toArray().then((users) => {
    //     console.log('users', users);
    // }).catch(error => {
    //     console.log('error', error);
    // }).finally(() => {
    //     //关闭连接
    //     client.close();
    // });
})
