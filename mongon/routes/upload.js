var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const {
  delrecource,
  upload,
  findrecource,
  findUserLoad
} = require("../controller/loadController");
router.post('/up', async (req, res, next) => {
  const form = formidable({
    multiples: true
  });
  // 设置编码
  form.encoding = 'utf-8';
  // 保留后缀名
  form.keepExtensions = true;
  // 设置存储路径
  form.uploadDir = path.join(__dirname, '../public/files/');
  form.parse(req, function (err, fields, files) {
    console.log('fields', fields); //表单传递的input数据  
    console.log('files', files); //上传文件数据  
    if (err) return next(err);
    let date = (new Date()).getTime();
    // 获取文件路径
    let oldPath = files.file.path;
    console.log(`oldPath: ${oldPath}`);
    // 上传的图片名
    let imgName = files.file.name;
    // 用activity_替换图片名
    let newImgName = imgName.replace(/[^.]+/, `activity_${date}`);
    console.log(`newImgName: ${newImgName}`)
    // 组合成新路径名
    let newPath = path.join(path.dirname(oldPath), newImgName);
    console.log(`newPath: ${newPath}`)
    // 图片文件重命名路径
    fs.rename(oldPath, newPath, async (err) => {
      if (err) next(err);
      let result = await upload({
        username: fields.username,
        description: fields.description,
        filename: newImgName,
        url: `/files/${newImgName}`
      })
      return res.send(result);
    })
  });

});

router.get('/del', async (req, res, next) => {
  console.log(req.query);
  let result = await delrecource(req.query);
  return res.json(result);
});
router.get('/findone', async (req, res, next) => {
  console.log(req.query);
  let result = await findrecource(req.query);
  return res.json(result);
});
router.get('/findusers', async (req, res, next) => {
  console.log(req.query);
  let result = await findUserLoad(req.query);
  return res.json(result);
});
module.exports = router;