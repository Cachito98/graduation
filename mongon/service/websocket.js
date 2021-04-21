const ws = require('nodejs-websocket')
const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2
const {localDate} = require('../utils/common');

let count = 0
const serve = ws.createServer(connect =>{
        connect.on('text',data=>{
            count ++
            if(connect.name == undefined){
                connect.name = data;
                broadcast({
                    type:TYPE_ENTER,
                    msg:data+"进来了",
                    time:localDate()
                })
            }else{
               broadcast({
                type:TYPE_MSG,
                // msg:connect.name +": "+data,
                msg:{name:connect.name,data},
                time:localDate()
            }) 
            }
            
        })
        connect.on('close',()=>{
            console.log('连接断开了');
            count--
            broadcast({
                type:TYPE_LEAVE,
                msg:`${connect.name}离开了聊天室`,
                time:localDate()
                })

        })
        connect.on('error',()=>{
            console.log("用户连接异常");
        })
}).listen(4000)


function broadcast(msg){
    serve.connections.forEach(item=>{
        item.send(JSON.stringify(msg))
    })
}



