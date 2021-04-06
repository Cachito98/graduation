var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {localDate} = require('../../utils/common');
var zl = new Schema({
    filename: String,
    username:String,
    description:String,
    url:{
        type:String,
        default: ""
    },
    updated: { type: Date, default: localDate()},
});

module.exports = mongoose.model('zl',zl); 