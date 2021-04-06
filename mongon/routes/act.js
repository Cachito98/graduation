var express = require('express');
var router = express.Router();

const {
  editAct,
  deleAct,
  creatAct,
  getAll,
  getOne,
  getAllAct
} = require("../controller/activityController");

router.post('/add', async (req, res, next) => {
  console.log(req.body);
  let result = await creatAct(req.body);
  return res.json(result);
});

/* GET users listing. */
router.get('/all', async (req, res, next) => {
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh",req.query);
  let result = await getAll(req.query);
  return res.json(result);
});

router.get('/noparam', async (req, res, next) => {
  let result = await getAllAct();
  return res.json(result);
});

router.get('/one', async (req, res, next) => {
  console.log(req.query);
  let result = await getOne(req.query);
  return res.json(result);
});

router.post('/edit', async (req, res, next) => {
  console.log(req.body);
  let result = await editAct(req.body);
  return res.json(result);
});
router.get('/del', async (req, res, next) => {
  console.log(req.query);
  let result = await deleAct(req.query);
  return res.json(result);
});

module.exports = router;