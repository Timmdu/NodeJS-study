const User = require('../db/model/user')

async function login(uername, password) {
  const user = await User.findOne({
        //查询条件
        where: {
            username: uername,
            password: password
        }
    })

    if(user === null) return {};
    return user.dataValues;
}

module.exports = login