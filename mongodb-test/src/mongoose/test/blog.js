const Blog = require('../models/Blog');

(async () => {
    //创建
    // await Blog.create({
    //     title:'新标题',
    //     content: '新内容',
    //     author: 'zhangsan'
    // })

    //查找
    // const list = await Blog.find({
    //     author: /zh/
    // }).sort({
    //     _id: -1
    // })

    // console.log(list); 数组

    // const blog = await Blog.findById('63d3e88417b483a3be82179d');
    // console.log(blog)

    //修改
    // const res = await Blog.findOneAndUpdate({
    //     _id: '63d3e88417b483a3be82179d'
    // }, {
    //     content: '内容3内容3'
    // }, {
    //     new: true // 返回修改之后的最新内容，默认为false
    // })

    // console.log(res);

    //删除
    // const res = await Blog.findOneAndDelete({
    //     _id: '63d3e88417b483a3be82179d',
    //     author: 'zhangsan'
    // })
    // console.log(res);

})()