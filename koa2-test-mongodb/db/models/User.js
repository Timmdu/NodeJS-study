//对应 user 集合

const mongoose = require('../db');

//Schema定义数据规范
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    realname: String
}, { timestamps: true });

//Model 对应collection
const User = mongoose.model('user', UserSchema);

module.exports = User;
