var express = require('express');
const login = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
var router = express.Router();

router.post('/login', function (req, res, next) {
    const user = req.body.user;
    const password = req.body.password;

    const result = login(user, password);
    return result.then(data => {
        if (data.username) {
            //更新session
            req.session.username = data.username;
            req.session.realname = data.realname;

            res.json(
                new SuccessModel()
            );
        } else {
            res.json(
                new ErrorModel('登录失败')
            );
        }
    })

});

// router.get('/login-test', (req, res, next) => {
//     if(req.session.username) {
//         res.json({
//             erron: 0,
//             msg: '测试成功'
//         })
//     } else {
//         res.json({
//             erron: 01,
//             msg: '未登录'
//         })
//     }
// })

// router.get('/session-test', function (req, res, next) {
//     const session = req.session;
//     if (session.viewNum == null) {
//         session.viewNum = 0;
//     }
//     session.viewNum++;
//     res.json({
//         viewNum: session.viewNum
//     });
// })

module.exports = router;