const Act = require("../db/model/activity");

//获取活动
async function getActivty(username) {
    try {
        let result = await Act.find({
            username: username
        });
        return result;
    } catch (error) {
        return error
    }
}
async function getallActivty() {
    try {
        let result = await Act.find();
        return result;
    } catch (error) {
        return error
    }
}
//获取文章
async function getActOne(id) {
    try {
        let result = await Act.find({
            "_id": id,
        });
        return result;
    } catch (error) {
        return error
    }
}
//添加
async function AddAct({
    title,
    description,
    content,
    username,
    time
}) {
    try {
        let act = new Act({
            title:title,
            description:description,
            content:content,
            username:username,
            time:time
        });
        let result = await act.save();
        return result;
    } catch (error) {
        return error
    }
}
//删除文章
async function getRemove({id}) {
    try {
        let result = await Act.remove({"_id": id});
        return result;
    } catch (error) {
        return error
    }

}
//修改文章
async function ActEdit({
    id,
    title,
    description,
    content,
    username,
    time
}) {
    try {
        let result = await Act.updateOne(
            {"_id": id}, //条件
            {
                time:time,
                title:title,
                description:description,
                content:content,
                username:username,
                },     //要更新的内容);
        )
        return result;
    } catch (error) {
        return error
    }
}

module.exports = {
    ActEdit,
    getRemove,
    AddAct,
    getActOne,
    getActivty,
    getallActivty
}