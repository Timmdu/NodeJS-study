const {User, Blog} = require('./model');

// (async function() {
//     //创建 user
//     const zhangsan = await User.create({
//         username: 'zhangsan',
//         password: '123',
//         realname: '张三'
//     })

//     console.log('zhangsan', zhangsan.dataValues);
// })()

//在数据库中插入数据
(async function() {
    //创建 blog
    const blog = await Blog.create({
        title:'博客标题AAA',
        content: '博客内容AAA',
        author: 'zhangsan'
    })

    console.log('blog', blog.dataValues);
})()