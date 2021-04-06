var express = require('express');
var router = express.Router();

const {JoinChat,
    leaveChat} =  require("../controller/chatController"); 
router.get('/enter',async (req, res, next)=>{
  console.log(req.query);
  let result = await JoinChat(req.query); 
  return res.json(result);
});

router.get('/leave',async (req, res, next)=>{
    console.log(req.query);
    let result = await leaveChat(req.query); 
    return res.json(result);
  });
  
module.exports = {router};
