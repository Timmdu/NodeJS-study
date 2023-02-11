const fs = require('fs');
const path = require('path');

//标准输入输出，不处理输入内容，直接通过管道pipe输出，提高处理效率
// process.stdin.pipe(process.stdout);

const http = require('http');
const server = http.createServer((req, res) => {
    //返回请求的内容
    if(req.method === 'POST') {
        req.pipe(res); //通过管道
    } 

    //返回文件内容，文件内容过大，响应时间过慢
    if(req.method === 'GET') {
        const filename = path.resolve(__dirname, 'data.txt');
        const readStream = fs.createReadStream(filename);
        readStream.pipe(res);
    }
})

server.listen(7000);
