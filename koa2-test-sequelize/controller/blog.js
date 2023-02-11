
const Sequelize = require('sequelize');
const Blog = require('../db/model/blog')
const xss = require('xss');

async function getList(author, keyword) {
    const whereOpt = {};
    if (author) whereOpt.author = author;
    if (keyword) whereOpt.title = {
        [Sequelize.Op.like]: `%${keyword}%` //模糊查询
    }

    const blogList = await Blog.findAll({
        where: whereOpt,
        order: [
            ['id', 'desc']
        ]
    });

    return blogList.map(item => item.dataValues);
}

async function getDetail(id) {
    const details = await Blog.findOne({
        //查询条件
        where: {
            id
        }
    })

    if (!details) return null;
    return details.dataValues;
}

async function newBlog(blogData = {}) {
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const blog = await Blog.create({
        title,
        content,
        author
    })

    return {
        id: blog.dataValues.id
    }
}

async function updateBlog(id, blogData = {}) {
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const res = await Blog.update(
        //要修改的内容
        {
            title,
            content
        },
        //条件
        {
            where: {
                id
            }
        }
    );

    if (res[0] >= 1) return true;
    return false;
}

async function deleteBlog(id, author) {
    const result = await Blog.destroy({
        where: {
            id,
            author
        }
    });

    if(result >=1 ) return true;
    return false;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}