const http = require('http');
const queryString = require('querystring')

const server = http.createServer((req, res) => {

    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);

    //设置返回格式为JSON
    res.setHeader('Content-type', 'application/json');

    //返回的数据
    const resData = {
        method,
        url,
        path,
        query
    }

    console.log('cur time', Date.now());

    console.error('模拟出错');

    if(req.url === '/err') {
        throw new Error('error');
    }

    if(method === 'GET') {
        res.end(
            JSON.stringify({data: 'test pm2 aaaa'})
        )
    }

    if(method === 'POST') {
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })

        req.on('end', () => {
            resData.postData = postData;
            res.end(JSON.stringify(resData));
        })
    }
});





server.listen(8000);