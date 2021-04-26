const mongoose = require('mongoose');
const {localDate} = require('../../utils/common');
const Schema = mongoose.Schema;
let blogObj = new Schema({
    updated: { type: Date, default: localDate()},
    username:{
        type:String,
        default: ""
    },
    title:{
        type:String,
        default: ""
    },
    description:{
        type:String,
        default: "" 
    },
    imgUrl:{
        type:String,
        default: "" 
    },
    content:{
        type:String,
        default: ""
    },
    editorState:{
        type:Object,
        default: ""
    },
    likes:{
        type: Number, default: 0
    },  // 点赞数 （数字类型）
    resourceId:{
        type:String,
        default: ""
    },  // 资源ID （字符类型）
    reviewM:{
        type: String, default: "0"
    },  // 是否审核 （数字类型）
    isBad:{
        type: String, default: "0"
    }  // 是否被举报 （数字类型）
});
 
module.exports = mongoose.model('blog',blogObj);