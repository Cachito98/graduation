const {
    removeChats,
    addChats
} = require('../service/chatService');
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');

// 加入
async function JoinChat({username}) {
    let user = await addChats(username);
    console.log(user)
    if (user) {
        return new SuccessModel({
            msg: '加入成功',
            data: user
        });
    } else {
        console.log("加入失败");
        return new ErrorModel({"code":"1200","msg":"加入失败"});
    }
}

// 退出
async function leaveChat({username}) {
    let re = await removeChats(username)
    console.log("aaaaaaaaaaaaa", re)
    if (re.ok) {
        return new SuccessModel({
            msg: '退出成功',
            data: re
        });
    } else {
        return new ErrorModel({"code":"1200","msg":"退出失败"});
    }

}

module.exports = {
    JoinChat,
    leaveChat,
}