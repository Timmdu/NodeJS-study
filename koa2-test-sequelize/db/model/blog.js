const Sequelize = require('sequelize');
const seq = require('../seq');

//定义数据表
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

module.exports = Blog
