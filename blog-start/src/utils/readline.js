const fs = require('fs');
const path = require('path');
const readLine = require('readline');

//在服务端读取大文件，考虑内存和IO 的影响，一般都通过流的方式进行读取
const fullfilename = path.join(__dirname, '../', '../', 'logs', 'access.log');
//创建read stream
const readStream = fs.createReadStream(fullfilename);

//创建readline对象
const rl = readLine.createInterface({
    input: readStream
});

let edgeNum = 0;
let totalNum = 0;

//逐行读取
rl.on('line', (lineData) => {
    if (!lineData) {
        return;
    }
    totalNum++;

    const arr = lineData.split(' -- ');
    if (arr.length > 2 && arr[2].indexOf('Edg') > -1) {
        edgeNum++;
    }
})

rl.on('close', ()=> {
    console.log('Edge 占比', edgeNum / totalNum);
})

