var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersObj = new Schema({
    username: String,
    password: String,
    phone: { type: String, default: ""},
    email: { type: String, default: ""},
    school: { type: String, default: ""}, // 学校
    edu: { type: String, default: ""},    // 学历
    star: { type: Boolean, default: 0},   // 权限
    review: { type: Number, default: 0},  // 审核
});

module.exports = mongoose.model('user',usersObj);