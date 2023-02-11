const Sequelize = require('sequelize');
const seq = require('./db');

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

const Blog = seq.define( 
    'blog',//对应同步到数据库的blogs表
    {
        //id动态生成
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },

        //createdAt, updatedAt - 自动创建
    }
)

module.exports ={
    User,
    Blog
}