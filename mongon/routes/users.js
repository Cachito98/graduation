var express = require('express');
var router = express.Router();

const {loginCheck, signin,SetReview,changeInfo,getAllUsers} =  require("../controller/userController"); 

router.post('/chg',async (req, res, next)=>{
  console.log(req.body);
  let result = await changeInfo(req.body); 
  return res.json(result);
});

router.post('/res',async (req, res, next)=>{
  console.log(req.body);
  let result = await signin(req.body); 
  return res.json(result);
}); 

router.post('/login',async (req, res, next)=>{
  console.log(req.body);
  let result = await loginCheck(req.body); 
  if(result.code == 200){
    console.log(result);
    console.log("200",req.session);
  }
  return res.json(result);
}); 

router.post('/setrev',async (req, res, next)=>{
  console.log(req.body);
  let result = await SetReview(req.body); 
  return res.json(result);
});

router.get('/all',async (req, res, next)=>{
  let result = await getAllUsers(); 
  return res.json(result);
});

router.get('/tt',async (req, res, next)=>{
  return res.json({"code":"链接成功"});
});
module.exports = router;
