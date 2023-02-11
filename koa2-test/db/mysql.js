const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONFIG);

//开始链接
con.connect()

//执行sql 语句
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql,(error, result) => {
            if(error) {
                reject(error);
                return;
            } 

            resolve(result);
        });
    })

    return promise;
}

module.exports = {
    exec,
    escape: mysql.escape
}