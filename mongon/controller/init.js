const {signAdmin} = require('../controller/adminController');

async function init(){
    let result = await signAdmin( {"username": "admin",
        "password": "2331",
        "nickname": "管理员"})
    if(result.code == "200"){
        console.log(result, "初始化成功");
    }  
}

module.exports = init; 
