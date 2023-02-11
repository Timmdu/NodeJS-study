const http = require('http');

//组件中间件
function compose(middleWarelist) {
    return function (ctx) {
        function dispatch(i) {
            const fn = middleWarelist[i];
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return dispatch(0);
    }
}

class LikeKoa2 {
    constructor() {
        this.middleWarelist = []
    }

    use(fn) {
        this.middleWarelist.push(fn);
        return this; //链式调用
    }

    createContext(req, res) {
        const ctx = {
            req,
            res
        }

        ctx.query = req.query;
        return ctx;
    }

    handleRequest(ctx, fn) {
        return fn(ctx);
    }

    //返回callback函数
    callBack() {
        //组合所有middleware形成链式调用,返回值为一个方法。
        const fn = compose(this.middleWarelist);
        return (req, res) => {
            const ctx = this.createContext(req, res);
            //trigger middleware
             this.handleRequest(ctx, fn);
        }
    }

    listen(...args) {
        const server = http.createServer(this.callBack());
        server.listen(...args);
    }
}

module.exports = LikeKoa2