const crypto = require('crypto');

//密匙
const SECRET_KEY = 'WJI@1_2345*';

//md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

//加密函数
function genPassword(password) {
    //拼接成一个字符串，里面需要包含password和secret key.
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

module.exports = { genPassword }