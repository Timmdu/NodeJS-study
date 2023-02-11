const fs = require('fs');
const path = require('path');

//两个文件名
const filename1 = path.resolve(__dirname, 'data.txt');
const filename2 = path.resolve(__dirname, 'data-bak.txt');
//读取文件的stream 对象
const readStream = fs.createReadStream(filename1);
//写入文件的stream 对象
const writeStream = fs.createWriteStream(filename2);
//执行拷贝，通过管道(pipe)

const startDate = (new Date()).getTime();
console.log('开始拷贝,')
readStream.pipe(writeStream);

readStream.on('data', (chunk) => {
    console.log('拷贝中=================================================, ', chunk.toString());
})

readStream.on('end', function() {
    const endDate = (new Date()).getTime();
    const timeCost = endDate - startDate;
    console.log('拷贝完成, ', timeCost);
})

