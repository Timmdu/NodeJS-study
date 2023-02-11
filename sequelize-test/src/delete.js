const { Blog } = require('./model');

(async function() {
   const result = await Blog.destroy({
        where: {
            id: 2,
            author: 'lisi'
        }
    });
    
    console.log('result', result);
})()