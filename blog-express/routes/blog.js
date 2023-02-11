var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const loginCheck = require('../middleware/loginCheck')


// api/blog/list
router.get('/list', (req, res, next) => {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    if (req.query.isadmin) {
        if (req.session.username == null) {
            res.json(
                new ErrorModel('未登录')
            )
            return;
        } else {
            author = req.session.username;
        }
    }

    const result = getList(author, keyword);
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        );
    })
});

// api/blog/detail
router.get('/detail', loginCheck, (req, res, next) => {
    //res.json 在放回json string的同时，还制定了res的content type.
    const result = getDetail(req.query.id);
    return result.then(blogDetail => {
        if (blogDetail) {
            res.json(new SuccessModel(blogDetail));
        } else {
            res.json(new ErrorModel('未找到对应文件'));
        }
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data => {
        res.json(new SuccessModel(data));
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body);
    return result.then(data => {
        if (data) {
            res.json(new SuccessModel());
        } else {
            res.json(new ErrorModel());
        }
    })
})

router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username;
    const id = req.query.id;
    const result = deleteBlog(id, author);
    return result.then(data => {
        if (data) {
            res.json(new SuccessModel());
        } else {
            res.json(new ErrorModel('删除失败'));
        }
    })
})

module.exports = router;