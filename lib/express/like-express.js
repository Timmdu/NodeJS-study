const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
    constructor() {
        //用来存储所有middleware, middleware是有顺序的
        this.routs = []
    }

    register(path) {
        const info = {};
        if (typeof path === 'string') {
            info.path = path;
            info.stack = slice.call(arguments, 1); // 从第二个元素开始，转换为数组，存入stack.
        } else {
            info.path = '/';
            info.stack = slice.call(arguments, 0); // 从第一个元素开始，转化为数组，存入stack.
        }

        return info;
    }

    use() {
        const info = this.register.apply(this, arguments);
        this.routs.push({
            method: 'any',
            path: info.path,
            stack: info.stack
        });
    }

    get() {
        const info = this.register.apply(this, arguments);
        this.routs.push({
            method: 'get',
            path: info.path,
            stack: info.stack
        });
    }

    post() {
        const info = this.register.apply(this, arguments);
        this.routs.push({
            method: 'post',
            path: info.path,
            stack: info.stack
        });
    }

    match(method, url) {
        let stack = [];
        if (url === '/favicon.ico') {
            return stack;
        }

        //根据method, url 获取可用middleware.
        this.routs.forEach(routeInfo => {
            if (url.indexOf(routeInfo.path) === 0 && (routeInfo.method === method || routeInfo.method === 'any')) {
                console.log('match router', routeInfo.path);
                stack = stack.concat(routeInfo.stack)
            }
        })

        return stack;
    }

    hanlder(req, res, stack) {
        const next = () => {
            const firstMiddleWare = stack.shift();
            if (firstMiddleWare) {
                //把内部方法传递到外部，由外部决定是否call
                firstMiddleWare(req, res, next);
            }
        }

        next();
    }

    //监听
    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json');
                res.end(
                    JSON.stringify(data)
                )
            }

            const url = req.url;
            const method = req.method.toLowerCase();

            //找到当前match的callback
            const callbackList = this.match(method, url);

            //触发hanlder
            this.hanlder(req, res, callbackList);
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args); //参数的透传
    }

}

module.exports = () => {
    return new LikeExpress();
}