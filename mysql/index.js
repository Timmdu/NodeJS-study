const mysql = require('mysql');

// 创建链接对象
const con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'dxd2055496',
    port: '3306',
    database: 'myblog'
});

//开始链接
con.connect()

//执行sql 语句
const sql = 'select * from users;'
con.query(sql,(error, result) => {
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
});

con.end();