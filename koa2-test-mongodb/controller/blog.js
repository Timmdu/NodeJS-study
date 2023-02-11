const Blog = require('../db/models/Blog');
const xss = require('xss');


const getList = async (author, keyword) => {
    const whereOpt = {};
    if (author) whereOpt.author = author;
    if (keyword) whereOpt.keyword = new RegExp(keyword);

    const list = await Blog.find(whereOpt).sort({ _id: -1 });
    return list;
}

const getDetail = async (id) => {
    const blog = await Blog.findById(id);
    return blog;
}

const newBlog = async (blogData = {}) => {
    //xss用来防止xss攻击
    const title = xss(blogData.title)
    const content = blogData.content;
    const author = blogData.author;
    const blog = await Blog.create({
        title,
        content,
        author
    });

    return {
        id: blog._id
    }
}

const updateBlog = async (id, blogData = {}) => {
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const blog = await Blog.findOneAndUpdate({
        _id: id
    }, {
        title,
        content
    }, {
        new: true // 返回修改之后的最新内容，默认为false
    })

    return blog !== null;
}

const deleteBlog = async (id, author) => {
    const blog = await Blog.findOneAndDelete({
        _id: id,
        author
    })

    return blog !== null;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}