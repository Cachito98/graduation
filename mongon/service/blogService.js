const Blog = require("../db/model/blog");

//获取文章列表
async function getBlogsList(username) {
    try {
        let result = await Blog.find({
            username: username
        });
        return result;
    } catch (error) {
        return error
    }
}

//获取文章
async function getBlogsArt(id) {
    try {
        let result = await Blog.find({
            "_id": id,
        });
        return result;
    } catch (error) {
        return error
    }
}
//添加文章
async function getBlogsAdd({
    isBad,
    reviewM,
    resourceId,
    likes,
    title,
    description,
    content,
    username,
    updated
}) {
    try {
        let blog = new Blog({
            isBad:isBad,
            reviewM:reviewM,
            resourceId:resourceId,
            likes:likes,
            title:title,
            description:description,
            content:content,
            username:username,
            updated:updated
        });
        let result = await blog.save();
        return result;
    } catch (error) {
        return error
    }
}
//删除文章
async function getBlogsRemove({id}) {
    try {
        let result = await Blog.remove({"_id": id});
        return result;
    } catch (error) {
        return error
    }

}
//修改文章
async function getBlogsEdit({
    id,
    isBad,
    reviewM,
    resourceId,
    likes,
    title,
    description,
    content,
    username,
}) {
    try {
        let result = await Blog.updateOne(
            {"_id": id}, //条件
            {isBad:isBad,
                reviewM:reviewM,
                resourceId:resourceId,
                likes:likes,
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
//更新阅读量
async function addBlogsView({
    id,likes
}) {
    try {
        let result = await Blog.updateOne(
            {"_id": id}, 
            {"likes": ++likes}
        );
        return result;
    } catch (error) {
        return error
    }
}
async function isBadSerive({
    id,isBad
}) {
    try {
        console.log(isBad,"isBad")
        let result = await Blog.updateOne(
            {"_id": id}, 
            {"isBad": isBad}
        );
        return result;
    } catch (error) {
        return error
    }
}
async function setReview({
    id,reviewM
}) {
    try {
        let result = await Blog.updateOne(
            {"_id": id}, 
            {"reviewM": reviewM}
        );
        return result;
    } catch (error) {
        return error
    }
}
async function getReview() {
    try {
        let result = await Blog.find(
            {"reviewM": 0}, 
        );
        return result;
    } catch (error) {
        return error
    }
}
async function getBadService() {
    try {
        let result = await Blog.find(
            {"isBad": 1}, 
        );
        return result;
    } catch (error) {
        return error
    }
}
async function getAllService() {
    try {
        let result = await Blog.find();
        return result;
    } catch (error) {
        return error
    }
}
module.exports = {
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
}