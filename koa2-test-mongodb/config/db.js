const env = process.env.NODE_ENV // 环境变量

//配置
let MYSQL_CONFIG = {}
let REDIS_CONF = {}

if (env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'dxd2055496',
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'dxd2055496',
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = { MYSQL_CONFIG, REDIS_CONF }

