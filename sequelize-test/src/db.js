const Sequelize = require('sequelize');

const conf = {
    host:'localhost',
    dialect:'mysql'
}

//生产环境下使用连接池 
// conf.pool = {
//     max:5, //连接池最大连接数
//     min:0, //连接池最小连接数
//     idle:10 * 10000// 如果一个连接10s内没被使用，则释放
// }

//创建 sequelize 实例
const seq = new Sequelize(
    'myblog_sequelize',
    'root',
    'dxd2055496',
    conf
);

//测试链接
// seq.authenticate().then(() => {
//     console.log('connect ok');
// }).catch((error) => {
//     console.log('failed', error);
// })

module.exports = seq;