const Sequelize = require('sequelize');
const seq = require('../seq');

//定义数据库表
const User = seq.define(
    'user', //对应同步到数据库的users 表,自动生成users表
    {
        //id, 默认实现ID
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        realname: {
            type: Sequelize.STRING
        }
    }
)

module.exports = User
