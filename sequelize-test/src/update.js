const {Blog} = require('./model');

(async function() {
    const res = await Blog.update(
        //要修改的内容
        {
            title: '标题AAA',
            content: '内容BBB'
        },
        {
            where: {
                id: 22
            }
        }
    );

    console.log('res', res); //[1]：影响一行,  [0]:影响0行
})()