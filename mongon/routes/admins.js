var express = require('express');
var router = express.Router();

const {loginAdmin} =  require("../controller/adminController"); 

router.post('/login',async (req, res, next)=>{
  console.log(req.body);
  let result = await loginAdmin(req.body); 
  if(result.code == 200){
    console.log(result);
    console.log("200",req.session);
  }
  return res.json(result);
}); 

module.exports = router;
