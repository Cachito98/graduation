var mongoose = require('mongoose') // 引入 mongoose
var url = "mongodb://localhost:27017/"; // 本地数据库地址
mongoose.connect(url)

// connect() 返回一个状态待定（pending）的连接，可以用来判断连接成功或失败
var db = mongoose.connection; 
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Successful connection to "+url)
// });
mongoose.connection.on('connected',function(){
  console.log('连接成功');
});
mongoose.connection.on('error',function(){
  console.log('连接失败');
});
mongoose.connection.on('disconnected',function(){
  console.log('连接断开');
});