const {
    removeRE,
    addRE,
    findRE,
    findUserRE
} = require('../service/loadService');
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');


async function upload({username,description,filename, url}) {
    let user = await addRE(username,description,filename, url);
    console.log(user)
    if (user) {
        return new SuccessModel({
            msg: '上传成功',
            data: user
        });
    } else {
        console.log("上传失败");
        return new ErrorModel({"code":"1200","msg":"上传失败"});
    }
}


async function delrecource({id}) {
    let re = await removeRE(id)
    console.log("aaaaaaaaaaaaa", re)
    if (re.ok) {
        return new SuccessModel({
            msg: '删除成功',
            data: re
        });
    } else {
        return new ErrorModel({"code":"1200","msg":"删除失败"});
    }
}
async function findrecource({id}) {
    let re = await findRE(id)
    console.log("aaaaaaaaaaaaa", re)
    if (re != null) {
        return new SuccessModel({
            msg: '查找成功',
            data: re
        });
    } else {
        return new ErrorModel({"code":"1200","msg":"查找失败"});
    }
}
async function findUserLoad({username}) {
    let re = await findUserRE(username)
    console.log("aaaaaaaaaaaaa", re)
    if (re != null) {
        return new SuccessModel({
            msg: '查找成功',
            data: re
        });
    } else {
        return new ErrorModel({"code":"1200","msg":"查找失败"});
    }
}
module.exports = {
    delrecource,
    upload,
    findrecource,
    findUserLoad
}