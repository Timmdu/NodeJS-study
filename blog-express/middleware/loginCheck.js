const { ErrorModel } = require('../model/resModel');
//登录中间件
module.exports = (req, res, next) => {
    if(req.session.username) {
        next()
        return;
    } else {
        res.json(new ErrorModel('未登录'));
    }
}