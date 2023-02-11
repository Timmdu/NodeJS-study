const Sequelize = require('sequelize');
const { MYSQL_CONFIG} = require('../config/db')

const conf = {
    host: MYSQL_CONFIG.host,
    dialect: 'mysql'
}

if (process.env.NODE_ENV === 'production') {
    //生产环境下使用连接池 
    conf.pool = {
        max: 5, //连接池最大连接数
        min: 0, //连接池最小连接数
        idle: 10 * 10000// 如果一个连接10s内没被使用，则释放
    }
}

//创建 sequelize 实例
const seq = new Sequelize(
    MYSQL_CONFIG.database_seq,
    MYSQL_CONFIG.user,
    MYSQL_CONFIG.password,
    conf
);

module.exports = seq;