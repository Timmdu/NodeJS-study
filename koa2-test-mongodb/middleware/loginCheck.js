const { ErrorModel } = require('../model/resModel');
//登录中间件
module.exports = async (ctx, next) => {
    if(ctx.session.username) {
        await next()
        return;
    } else {
        ctx.body = (new ErrorModel('未登录'));
    }
}