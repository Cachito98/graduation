const{getBlogsFail,
    getBlogsArtFail,
    creatBlogsArtFail,
    editBlogsArtFail,
    deleBlogsArtFail,
} = require('../config/errorConfig');
const {
    getBlogsList, 
    getBlogsArt,
    getBlogsAdd,
    getBlogsRemove,
    getBlogsEdit,
    addBlogsView,
    isBadSerive,
    setReview,
    getReview,
    getBadService,
    getAllService
    } = require('../service/blogService');
const{SuccessModel,ErrorModel} = require('../model/ResultModel');

//获取文章列表
async function getBlogs({username}){
    let blogs = await getBlogsList(username);
    console.log(blogs);
    if(blogs.length > 0){
        if(blogs.length > 1){
            // blogs.pop(); //把留言板去掉
            return new SuccessModel({msg:'获取成功',data: blogs}); 
        }else{
           return new SuccessModel({msg:'获取成功',data: blogs}); 
        }
    }else if(blogs.length == 0){
        return new ErrorModel({
            code: 1005,
            msg: '博客列表为空'
        });
    }else{
        console.log("getBlogsFail");
        return new ErrorModel(getBlogsFail);
    }
}


async function getBlogsArticle(id){
    let art = await getBlogsArt(id);
    console.log(art);
    if(art.length){
        let result = addBlogsView(art[0]);
        console.log(result);
        return new SuccessModel({msg:'获取成功',data: art});
    }else{
        console.log("getBlogsArtFail");
        return new ErrorModel(getBlogsArtFail);
    }
}
//添加博客文章
async function creatBlogsArt({isBad,reviewM,resourceId,likes,title, description, content,username,updated}){
    let art = await getBlogsAdd({isBad,reviewM,resourceId,likes,title, description, content,username,updated});
    console.log("art",art);
    if(art){
        return new SuccessModel({msg:'创建成功',data: art});
    }else{
        console.log("creatBlogsArtFail");
        return new ErrorModel(creatBlogsArtFail);
    }
}
//删除博客文章
async function deleBlogsArt({id}){
    await getBlogsRemove(id);
    let art = await getBlogsRemove({id});
    console.log(art);
    if(art){
        return new SuccessModel({msg:'删除成功',data: art});
    }else{
        console.log("deleBlogsArtFail");
        return new ErrorModel(deleBlogsArtFail);
    }
}
//举报博客文章
async function isBadArt({id,isBad}){
    let art = await isBadSerive({id,isBad});
    console.log(art);
    if(art){
        return new SuccessModel({msg:'举报成功',data: art});
    }else{
        console.log("举报失败");
        return new ErrorModel({code:"1020",meg:"举报失败"});
    }
}
//审核博客文章
async function setReArt({id,reviewM}){
    let art = await setReview({id,reviewM});
    console.log(art);
    if(art){
        return new SuccessModel({msg:'审核成功',data: art});
    }else{
        console.log("审核失败");
        return new ErrorModel({code:"1020",meg:"审核失败"});
    }
}
//获取所有未博客文章列表
async function getReArt(){
    let art = await getReview();
    console.log(art);
    if(art){
        return new SuccessModel({msg:'获取成功',data: art});
    }else{
        console.log("获取失败");
        return new ErrorModel({code:"1020",meg:"获取失败"});
    }
}
//编辑博客文章
async function editBlogsArt({isBad,reviewM,resourceId,likes,title, description, content,username,id}){
    let art = await getBlogsEdit({isBad,reviewM,resourceId,likes,title, description, content,username,id});
    console.log(art);
    if(art.ok){
        return new SuccessModel({msg:'编辑成功',data: art});
    }else{
        console.log("editBlogsArtFail");
        return new ErrorModel(editBlogsArtFail);
    }
}
//获取所有举报
async function getBad(){
    let art = await getBadService();
    console.log(art);
    if(art.length){
        return new SuccessModel({msg:'获取成功',data: art});
    }else{
        return new ErrorModel({msg:'获取失败',data: art,code:"1002"});
    }
}
async function getAll(){
    let art = await getAllService();
    console.log(art);
    if(art.length){
        return new SuccessModel({msg:'获取成功',data: art});
    }else{
        return new ErrorModel({msg:'获取失败',data: art,code:"1002"});
    }
}
module.exports = {
    getBlogs,
    getBlogsArticle,
    creatBlogsArt,
    editBlogsArt,
    deleBlogsArt,
    isBadArt,
    setReArt,
    getReArt,
    getBad,
    getAll
}