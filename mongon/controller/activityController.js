const {
    ActEdit,
    getRemove,
    AddAct,
    getActOne,
    getActivty,
    getallActivty
    } = require('../service/activityService');
const{SuccessModel,ErrorModel} = require('../model/ResultModel');

//获取活动列表
async function getOne({id}){
    let result = await getActOne(id);
    console.log(result);
    if(result.length != 0){
        return new SuccessModel({msg:'获取成功',data: result}); 
    }else{
        return new ErrorModel({msg:'获取失败',data: result,code:2001});
    }
}

async function getAll({username}){
    let result = await getActivty(username);
    if(result.length){
        return new SuccessModel({msg:'获取成功',data: result});
    }else{
        return new ErrorModel({msg:'获取失败',data: result,code:2001});
    }
}
async function getAllAct(){
    let result = await getallActivty();
    if(result.length){
        return new SuccessModel({msg:'获取成功',data: result});
    }else{
        return new ErrorModel({msg:'获取失败',data: result,code:2001});
    }
}
//添加
async function creatAct({title,
    description,
    content,
    username,
    time}){
    let result = await AddAct({title,
        description,
        content,
        username,
        time});
    console.log("art",result);
    if(result){
        return new SuccessModel({msg:'创建成功',data: result});
    }else{
        return new ErrorModel({msg:'创建失败',data: result,code:2001});
    }
}
//删除
async function deleAct({id}){
    let art = await getRemove({id});
    console.log(art);
    if(art){
        return new SuccessModel({msg:'删除成功',data: art});
    }else{
        return new ErrorModel({msg:'删除失败',data: result,code:2001});
    }
}

//编辑博客文章
async function editAct({id,
    title,
    description,
    content,
    username,
    time}){
    let art = await ActEdit({id,
        title,
        description,
        content,
        username,
        time});
    console.log(art);
    if(art.ok){
        return new SuccessModel({msg:'编辑成功',data: art});
    }else{
        return new ErrorModel({msg:'编辑失败',data: result,code:2001});
    }
}

module.exports = {
    editAct,
    deleAct,
    creatAct,
    getAll,
    getOne,
    getAllAct
}