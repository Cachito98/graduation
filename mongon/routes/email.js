var express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const{SuccessModel,ErrorModel} = require('../model/ResultModel');
// 定义邮件服务器服，个人建议使用QQ邮箱，用Yeah(网易)邮箱配置出现各种问题
var transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    service: 'qq',
    secure: true,
    // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
    auth: {
        user: '981685450@qq.com', // 账号
        pass: 'ijyqunqqcvedbfjc' //邮箱设置 账号 POP3/IMAP/SMTP/CardDAV/CalDAV服务均支持SSL连接 的授权码
    }
});

router.post('/send', (req, res, next)=> {
    // 获取前端传递过来的参数
    let emailaddress = req.body.emailaddress;
    let username = req.body.username;
    let text = req.body.text;

    let sendHtml = `<div>
      <h1>亲爱的${username} : </h1>
      <div> ${text}</div>
    </div>`;

    let mailOptions = {
        // 发送邮件的地址
        from: '981685450@qq.com', // 和上面自己的邮箱保持一致
        // 接收邮件的地址
        to: emailaddress,  
        // 邮件主题
        subject: 'You have a new uploaded file',
        // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
        html: sendHtml
    };
    // 发送邮件，并有回调函数
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.json(new ErrorModel({code:"2000",msg: error}));
        }
        return res.json(new SuccessModel({msg:'发送成功',data: info})); 
    });
});

module.exports = router;