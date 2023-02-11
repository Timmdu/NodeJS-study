//演示Express 中间件 实现原理
const express = require('./like-express');

//本次 http 请求的实例
const app = express();


app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url);
    next();
})

app.use((req, res, next) => {
    //假设在处理cookie
    req.cookie = {
        userId: '123'
    }

    next();
})

app.use((req, res, next) => {
    //假设异步处理post data
    setTimeout(() => {
        req.body ={
            a: 100,
            b: 100
        }

        next();
    })
})

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由');
    next();
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由');
    next();
})

app.post('/api', (req, res, next) => {
    console.log('post /api 路由');
    next();
})

function loginCheck(req, res, next) {
    setTimeout(() => {
        console.log('登录成功');
        next()
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie');
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data',loginCheck, (req, res, next) => {
    console.log('post /api/get-post-data');
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('处理404');
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})
