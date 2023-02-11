//对应 user 集合

const mongoose = require('../db');

//Schema定义数据规范
const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true //必须的
    },
    content: String,
    author:{
        type: String,
        required: true //必须的
    }
});

//Model 对应collection
const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;
