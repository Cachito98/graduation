const mongoose = require('mongoose');
const {localDate} = require('../../utils/common');
const Schema = mongoose.Schema;
let Obj = new Schema({
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
    content:{
        type:String,
        default: ""
    },
    time:{
        type:String,
        default: ""
    }
});
 
module.exports = mongoose.model('act',Obj);