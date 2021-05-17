var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //日志
var fs = require('fs');
var session = require('express-session');
require("./db/mongo");
require("./service/websocket")


var adminRouter = require('./routes/admins');
var usersRouter = require('./routes/users'); 
var blogRouter = require('./routes/blogs');
var actRouter = require('./routes/act');
var emailRouter = require('./routes/email');
var megRouter = require('./routes/meg');
var chatRouter = require('./routes/chat').router;
var upRouter = require('./routes/upload');
var app = express();

app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'),{flags:'a'});
app.use(logger('combined',{
  stream : accessLogStream
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false, //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  name:"userid",
  secret: 'qian*qian+qian',  //用于生成无关紧要的userid的密钥
  cookie: { path:'/', httpOnly:true, maxAge: 24*60*60*1000 }
}))
//配置跨域
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin',  '*')
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  next()
})

const init = require('./controller/init');
init();

app.use('/api/user', usersRouter); 
app.use('/api/blog', blogRouter); 
app.use('/api/act', actRouter); 
app.use('/api/admin', adminRouter); 
app.use('/api/email', emailRouter); 
app.use('/api/meg', megRouter); 
app.use('/api/chat', chatRouter); 
app.use('/api/file', upRouter);
// catch 404 and forward to error handler
 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  
});
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
