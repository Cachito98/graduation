var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chatroom = new Schema({
    username: String,
    room:{
        type:String,
        default: "4000"
    }
});

module.exports = mongoose.model('chatroom',chatroom); 