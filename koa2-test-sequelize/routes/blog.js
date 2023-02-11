const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';
    if (ctx.query.isadmin) {
        if (ctx.session.username == null) {
            ctx.body = new ErrorModel('未登录')
            return;
        } else {
            author = ctx.session.username;
        }
    }

    const listData = await getList(author, keyword);
    ctx.body = new SuccessModel(listData);
})


router.get('/detail', async function (ctx, next) {
    const blogDetail = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(blogDetail);
})

router.post('/new', loginCheck, async function (ctx, next) {
    const body = ctx.request.body;
    body.author = ctx.session.username;

    const data = await newBlog(body);
    ctx.body = new SuccessModel(data);
})

router.post('/update', loginCheck, async function (ctx, next) {
    const data = await updateBlog(ctx.query.id, ctx.request.body);
    if (data) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('更新失败!');
    }
})

router.post('/del', loginCheck, async function (ctx, next) {
    const author = ctx.session.username;
    const id = ctx.query.id;
    const result = await deleteBlog(id, author);
    if (result) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('删除失败');
    }
})

module.exports = router