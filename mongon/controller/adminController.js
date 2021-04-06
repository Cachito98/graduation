const {
    getAdmin,
    getUsername,
    addAdmin,
} = require('../service/adminService');
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');
const {
    userExistsFail,
    userRegisterFail,
    userLoginFail
} = require('../config/errorConfig');
const generatePwd = require('../utils/crypto');

// 登录
async function loginAdmin({
    username,
    password
}) {
    let user = await getAdmin(username, generatePwd(password));
    console.log("api", generatePwd("2331"), "api", generatePwd(password));
    if (user.length) {
        return new SuccessModel({
            msg: '登录成功', 
            data: user
        });
    } else {
        console.log("userLoginFail");
        return new ErrorModel(userLoginFail);
    }
}

// 注册
async function signAdmin({
    username,
    password,
    nickname
}) {
    let re = await getUsername(username)
    if (re.length == 0) {
        let user = await addAdmin(username, generatePwd(password), nickname);
        if (user.length) {
            console.log("userRegisterFail");
            return new ErrorModel(userRegisterFail);
        } else {
            return new SuccessModel({
                msg: '注册成功',
                data: user
            });
        }
    } else {
        return new ErrorModel(userExistsFail);
    }

}

module.exports = {
    loginAdmin,
    signAdmin
}