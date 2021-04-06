var express = require('express');
var router = express.Router();
const {createMessage,createReply,getMessage,delReply,delMessage,getbad,setMegbad,
    seRebad,getREbad} =  require("../controller/mesController"); 

router.post('/add',async (req, res, next)=>{
    console.log(req.body);
    let result = await createMessage(req.body); 
    return res.json(result);
}); 
router.post('/reply',async (req, res, next)=>{
    console.log(req.body);
    let result = await createReply(req.body); 
    return res.json(result);
});
router.get('/get',async (req, res, next)=>{
    console.log("hhh",req.query);
    let result = await getMessage(req.query); 
    return res.json(result);
});
router.get('/delr',async (req, res, next)=>{
    console.log(req.query);
    let result = await delReply(req.query); 
    return res.json(result);
});  
router.get('/delm',async (req, res, next)=>{
    console.log(req.query);
    let result = await delMessage(req.query); 
    return res.json(result);
});  
router.get('/getbadmes',async (req, res, next)=>{
    console.log(req.query);
    let result = await getbad(); 
    return res.json(result);
}); 
router.get('/getbadre',async (req, res, next)=>{
    console.log(req.query);
    let result = await getREbad(); 
    return res.json(result);
}); 
router.get('/setrebad',async (req, res, next)=>{
    console.log(req.query);
    let result = await seRebad(req.query); 
    return res.json(result);
}); 
router.get('/setmsgbad',async (req, res, next)=>{
    console.log(req.query);
    let result = await setMegbad(req.query); 
    return res.json(result);
}); 
module.exports = router;