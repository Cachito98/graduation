var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminObj = new Schema({
    username: String,
    password: String,
    nickname: String,
});

module.exports = mongoose.model('admin',adminObj); 