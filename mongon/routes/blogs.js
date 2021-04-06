var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const {
  getBlogs,
  getBlogsArticle,
  creatBlogsArt,
  editBlogsArt,
  deleBlogsArt,
  isBadArt,
  setReArt,
  getReArt,
  getBad,
  getAll
} = require("../controller/blogController");

router.post('/addart', async (req, res, next) => {
  console.log(req.body);
  let result = await creatBlogsArt(req.body);
  return res.json(result);
});

/* GET users listing. */
router.get('/blogs', async (req, res, next) => {
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh",req.query);
  let result = await getBlogs(req.query);
  return res.json(result);
});
router.get('/all', async (req, res, next) => {
  let result = await getAll();
  return res.json(result);
});
router.get('/art', async (req, res, next) => {
  console.log(req.query);
  let result = await getBlogsArticle(req.query);
  return res.json(result);
});

router.post('/editart', async (req, res, next) => {
  console.log(req.body);
  let result = await editBlogsArt(req.body);
  return res.json(result);
});
router.get('/delart', async (req, res, next) => {
  console.log(req.query);
  let result = await deleBlogsArt(req.query);
  return res.json(result);
});
router.get('/bad', async (req, res, next) => {
  console.log(req.query);
  let result = await isBadArt(req.query);
  return res.json(result);
});
router.get('/getbad', async (req, res, next) => {
  console.log(req.query);
  let result = await getBad();
  return res.json(result);
});
router.get('/setre', async (req, res, next) => {
  console.log(req.query);
  let result = await setReArt(req.query);
  return res.json(result);
});
router.get('/allre', async (req, res, next) => {
  let result = await getReArt();
  return res.json(result);
});
module.exports = router;