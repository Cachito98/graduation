const Meg = require("../db/model/meg");
const Reply = require("../db/model/reply");

//添加留言
async function createMegs({username,artid,text,isbad}){
    try {
        let result = await Meg.create({ 
            "username":username,
            "artid":artid,
            "text":text,
            "isbad": isbad
        });
        return result;
    } catch (error) {
        return error
    }
}
//回复留言
async function replyMegs({username,reid,text,isbad}){
    try {
        let result = await Reply.create({ 
            username:username,
            reid:reid,
            text:text,
            isbad: isbad
        });
        return result;
    } catch (error) {
        return error
    }
}
//获取留言
async function getMegs({artid}){
    try {
        let result = await Meg.find({
            "artid":artid, 
        });
        console.log("result",result);
        return result;
    } catch (error) {
        return error
    }
}
//获取回复
async function getReplys({reid}){
    try {
        let result = await Reply.find({
            reid:reid
        });
        return result;
    } catch (error) {
        return error  
    }
}
//删除回复
async function delReplys({reid}){
    try {
        let result = await Reply.remove({
            reid:reid
        });
        return result;
    } catch (error) {
        return error
    }
}
async function delOneReply({id}){
    try {
        let result = await Reply.remove({
            "_id":id
        });
        return result;
    } catch (error) {
        return error
    }
}
//删除留言
async function delMeg({id}){
    try {
        let result = await Meg.remove({
          
        "_id":id,
    
        });
        return result;
    } catch (error) {
        return error
    }
}
//
async function getbadSerive(){
    try {
        let result = await Meg.find({
          
        "isbad":1,
    
        });
        return result;
    } catch (error) {
        return error
    }
}
async function getrebadSerive(){
    try {
        let result = await Reply.find({
          
        "isbad":1,
    
        });
        return result;
    } catch (error) {
        return error
    }
}
async function setMegbadSerive(id,isbad){
    try {
        let result = await Meg.updateOne(
            {"_id":id},
            {"isbad":isbad}
        );
        return result;
    } catch (error) {
        return error
    }
}
async function seRebadSerive(id,isbad){
    try {
        let result = await Reply.updateOne(
            {"_id":id},
            {"isbad":isbad}
        );
        return result;
    } catch (error) {
        return error
    } 
}
module.exports = {
    createMegs,
    replyMegs,
    getReplys,
    getMegs,
    delMeg,
    delReplys,
    delOneReply,
    getbadSerive,
    setMegbadSerive,
    seRebadSerive,
    getrebadSerive
}
