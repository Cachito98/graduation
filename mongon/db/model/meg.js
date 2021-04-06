var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let megObj = new Schema({
    username:{
        type:String,
        allowNull:false,
        default: ""
    }, 
    artid:{
        type:String,
        allowNull:false,
        default: ""
    },
    text:{
        type:String,
        allowNull:false,
        default: ""
    },
    isbad:{
        type:Number,
        allowNull:false,
        default: 0
    },
    updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('meg',megObj);