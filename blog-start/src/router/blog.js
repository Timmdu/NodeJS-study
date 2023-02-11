
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

//统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('未登录')
        );
    }
}

const handleBlogRouter = (req, res, path) => {
    const method = req.method;
    const id = req.query.id;

    if (method === 'GET' && path === '/api/blog/list') {
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';
        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }

            author = req.session.username;
        }

        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }

    if (method === 'GET' && path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then(blogDetail => {
            if(blogDetail) {
                return new SuccessModel(blogDetail);
            } else {
                return new ErrorModel('未找到对应文件')
            }
        })
    }

    if (method === 'POST' && path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req);
        console.log('check result', loginCheckResult);
        if (!!loginCheckResult) {
            return loginCheckResult;
        }

        console.log('log in check pass');

        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    if (method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req);
        if (!!loginCheckResult) {
            return loginCheckResult;
        }

        const result = updateBlog(id, req.body);
        return result.then(data => {
            if (data) {
                return new SuccessModel();
            } else {
                return new ErrorModel();
            }
        })
    }

    if (method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req);
        if (!!loginCheckResult) {
            return loginCheckResult;
        }

        const author = req.session.username;
        const result = deleteBlog(id, author);
        return result.then(data => {
            if (data) {
                return new SuccessModel();
            } else {
                return new ErrorModel('删除失败');
            }
        })
    }

}

module.exports = handleBlogRouter;