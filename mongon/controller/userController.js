const {
    getUser,
    addUser,
    getUsername,
    setReview,
    setInfor,
    getAll
} = require('../service/userService');
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');
const {
    userDataFail,
    userExistsFail,
    userRegisterFail,
    userLoginFail
} = require('../config/errorConfig');
const generatePwd = require('../utils/crypto');

// 登录
async function loginCheck({
    username,
    password
}) {
    let user = await getUser(username, generatePwd(password));
    console.log(user, username, password);
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
async function signin({
    username,
    password,
    phone,
    email,
    introduce,
    realname,
    imgurl,
    school,
    edu,
    star,
    review
}) {
    let re = await getUsername(username)
    console.log("aaaaaaaaaaaaa", re)
    if (re.length == 0) {
        console.log(re.username);
        let user = await addUser(username, generatePwd(password), imgurl,introduce,realname,phone, email, school, edu, star, review);
        console.log(user, username, password);
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
// 修改
async function changeInfo({
    username,
    realname,
    imgurl,
    educode,
    introduce,
    phone,
    email,
    school,
    edu,
    star,
    review
}) {
    let user = await setInfor(username,realname,imgurl,educode,introduce, phone, email, school, edu, star, review);
    if (user.ok) {
        return new SuccessModel({
            msg: '修改成功',
            data: user
        });
    } else {
        console.log("修改失败");
        return new ErrorModel({"code":"1300", "msg":"修改失败"});
    }
}
// 修改审核结果
async function SetReview({
    username,
    review
}) {
    let user = await setReview(username, review);
    console.log(user)
    if (user.nModified) {
        return new SuccessModel({
            msg: '修改成功',
            data: user
        });
    } else {
        console.log("修改失败");
        return new ErrorModel({"code":"1300", "msg":"修改失败"});
    }
}
async function getAllUsers() {
    let user = await getAll();
    if (user.length) {
        return new SuccessModel({
            msg: '获取成功',
            data: user
        });
    } else {
        return new ErrorModel({
            msg: '获取失败',
            data: user
        });
    }
}
module.exports = {
    loginCheck,
    signin,
    SetReview,
    changeInfo,
    getAllUsers
}