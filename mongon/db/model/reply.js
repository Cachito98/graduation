var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let reObj = new Schema({
    username:{
        type:String,
        allowNull:false,
        default: ""
    },
    reid:{
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
    updated: { type: Date, default: Date.now},
});
  
module.exports = mongoose.model('re',reObj);