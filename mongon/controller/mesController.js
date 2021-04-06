const {createMegs,
    replyMegs,
    getReplys,
    getMegs,
    delMeg,
    delReplys,
    delOneReply,
    getbadSerive,
    getrebadSerive,
    setMegbadSerive,
    seRebadSerive
    } = require('../service/megService');
const{SuccessModel,ErrorModel} = require('../model/ResultModel');
const{createMegsFail,createReplyFail,getMegFail,delMegFail} = require('../config/errorConfig');

async function createMessage({username,artid,text,isbad}){
    let result = await createMegs({username,artid,text,isbad});
    console.log("result",result);
    if(result){
        return new SuccessModel({msg:'创建成功',data: result});
    }else{
        console.log("createMegsFail");
        return new ErrorModel(createMegsFail);
    }
}
async function createReply({username,reid,text,isbad}){
    let result = await replyMegs({username,reid,text,isbad});
    console.log("result",result); 
    if(result){
        return new SuccessModel({msg:'创建成功',data: result});
    }else{
        console.log("createReplyFail");
        return new ErrorModel(createReplyFail);
    }
}
async function getMessage({artid}){
    let result = [];
    let megs = await getMegs({artid});
    if(megs.length != 0){
        for(let i = 0; i < megs.length; i++){
            result[i] = {};
            result[i].megs = megs[i];
            console.log("megs[i]",megs[i]);
            let replys = await getReplys({"reid":megs[i]["_id"]});
            if(replys){
                result[i].reply = replys;
            }
        }
        return new SuccessModel({msg:'获取成功',data: result});
    }else{
        console.log("getMegFail");
        return new ErrorModel(getMegFail);
    }
}
async function delReply({id}){
    let result = await delOneReply({id});
    if(result.ok){
        return new SuccessModel({msg:'删除成功',data: result});
    }else{
        console.log("delMegFail");
        return new ErrorModel(delMegFail);
    }
}
async function delMessage({id}){
    let megs = await delReplys({"reid":id});
    if(megs.length != 0){
        let result = await delMeg({id});
        if(result.length != 0){
           return new SuccessModel({msg:'删除成功',data: result}); 
        }else{
            console.log("delMegFail");
            return new ErrorModel(delMegFail);
        }
    }else{
        console.log("delMegFail");
        return new ErrorModel(delMegFail);
    }
}
async function setMegbad({id,isbad}){
    let result = await setMegbadSerive(id,isbad);
    console.log(result)
    if(result.nModified){
        return new SuccessModel({msg:'修改成功',data: result});
    }else{
        return new ErrorModel({msg:'修改失败',data: result,code:"2001"});
    }
}
async function seRebad({id,isbad}){
    let result = await seRebadSerive(id,isbad);
    console.log(result)
    if(result.nModified){
        return new SuccessModel({msg:'修改成功',data: result});
    }else{
        return new ErrorModel({msg:'修改失败',data: result,code:"2001"});
    }
}
async function getbad(){
    let result = await getbadSerive();
    if(result.length){
        return new SuccessModel({msg:'获取成功',data: result});
    }else{
        return new ErrorModel({msg:'获取失败',data: result,code:"2001"});
    }
}
async function getREbad(){
    let result = await getrebadSerive();
    if(result.length){
        return new SuccessModel({msg:'获取成功',data: result});
    }else{
        return new ErrorModel({msg:'获取失败',data: result,code:"2001"});
    }
}
module.exports = {
    createMessage,
    createReply,
    getMessage,
    delReply,
    delMessage,
    setMegbad,
    seRebad,
    getbad,
    getREbad
}