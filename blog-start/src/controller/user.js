const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = (username, password) => {
    // 转义关键字，从而防止sql注入攻击
    //select username, realname from users where username='zhangsan'-- ' and password="7122223"
    //select username, realname from users where username='zhangsan\'-- ' and password="7122223"
    username = escape(username);
    
    //用MD5机密算法生成加密密码，数据中存储的是加密后的密码。
    password = genPassword(password);

    const sql = `
     select username, realname from users where username=${username} and password='${password}'
    `;

    return exec(sql).then(rows => {
        return rows[0] || {};
    });
}

module.exports = login;