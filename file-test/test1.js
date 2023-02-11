const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');

// //读取文件内容
// fs.readFile(fileName, (err, data) => {
//     if(err) {
//         console.log(err);
//         return
//     }
//     //data 是二进制类型，需要转换成字符串
//     console.log(data.toString());
// })

//写入文件
//频繁写入内容浪费内容
//一次性写入文件过大
// const content = "\n这是新写入的内容";
// const opt = {
//     flag: 'a'//追加写入。 覆盖用 w
// }

// fs.writeFile(fileName, content, opt, (err) => {
//     if(err) {
//         console.log(err);
//         return
//     }
// })

// //判断文件是否存在
// fs.exists(fileName, (exist) => {
//     console.log('exist', exist);
// })