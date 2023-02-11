const seq = require('./db');

require('./model');

//测试链接
seq.authenticate().then(() => {
    console.log('connect ok');
}).catch((error) => {
    console.log('failed', error);
})

//同步数据库，会把之前的数据库进行覆盖
seq.sync({force: true}).then(() => {
    process.exit() //退出进程
})

