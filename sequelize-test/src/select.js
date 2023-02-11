const Sequelize = require('sequelize');
const {User, Blog} = require('./model');

//查询数据库中的数据
(async function() {
    //登录，查询一条数据
    // const zhangsan = await User.findOne({
    //     //查询条件
    //     where: {
    //         username: 'zhangsan',
    //         password: '1223'
    //     }
    // })

    // //查询成功
    // if(zhangsan) {
    //     console.log(zhangsan.dataValues);
    // } else {
    //     console.log(zhangsan);
    // }

    //查询多条数据， 博客列表
    const blogList = await Blog.findAll({
        where :{
            author: 'zhangsan',
            title: {
                [Sequelize.Op.like]: '%标题A%' //模糊查询
            }
        },
        order:[
             ['id', 'desc']
        ]
    });

    console.log('bloglist', blogList.map(item => item.dataValues));


})()