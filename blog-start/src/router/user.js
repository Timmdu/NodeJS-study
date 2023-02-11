const login = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis');


const handleUserRouter = (req, res, path) => {
    const method = req.method;

    if (method === 'POST' && path === '/api/user/login') {
        const user = req.body.user;
        const password = req.body.password;

        const result = login(user, password);
        return result.then(data => {
            if (data.username) {
                //更新session
                req.session.username = data.username;
                req.session.realname = data.realname;

                //同步session到redis中
                set(req.sessionId, req.session);

                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }
}

module.exports = handleUserRouter;
