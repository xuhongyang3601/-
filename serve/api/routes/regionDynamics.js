const express = require("express");
const pool = require("../pool");

// 记载fs模块
const fs = require("fs");
// 加载Multer中间件
const multer = require("multer");
// 加载uuid模块
const uuid = require("uuid");

// 指定文件自定义存储规则
let storage = multer.diskStorage({
  destination(req, file, cb) {
    let path = "public/upload";
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    path = `${path}/${year}-${month}-${day}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, (err) => {
        if (err) throw err;
      });
    }
    cb(null, path);
  },
  // 设置上传文件的存储规则
  filename: function (req, file, cb) {
    // 获取上传文件的原始名称
    let filename = file.originalname;
    // 获取上传文件的扩展名
    let extension = filename
      .substr(filename.lastIndexOf(".") + 1)
      .toLocaleLowerCase();
    // 生成基于时间戳的uuid作为主文件名
    let mainname = uuid.v1();
    // 生成完整的上传文件名称
    filename = mainname + "." + extension;
    // 实现上传业务
    cb(null, filename);
  },
});

// 按照自定义规则来创建multer对象
const upload = multer({ storage: storage });

// 创建社区动态详情列表路由
let router = express.Router();
// 动态详情列表接口
router.get("/dynamics", (req, res) => {
  let page = req.query.page;
  let count = 5;
  let pageCount;
  let sql = "SELECT count(did) AS pageCount FROM dynamic";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    pageCount = Math.ceil(result[0].pageCount / count);
    sql = `SELECT did,dtext,dimg,likeCount FROM dynamic LIMIT ${
      (page - 1) * count
    },${count}`;
    pool.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ message: "请求成功", code: 200, result, pageCount });
    });
  });
});

// 动态发布接口
router.post("/dynamic", upload.single("avatar"), (req, res) => {
  let dtext = req.body.dtext;
  let uid = req.body.uid;
  let dimg = req.file.path.replace("public", "");
  let sql = "INSERT INTO dynamic(dtext,dimg,uid) VALUES(?,?,?) ";
  pool.query(sql, [dtext, dimg, uid], (err, result) => {
    if (err) throw err;
    res.send({ message: "请求成功", code: 200, result: result });
  });
});
// 获取当前用户发布的动态数量
router.get("/dcount", (req, res) => {
  let uid = req.query.uid;
  let sql = "SELECT COUNT(did) AS dcount FROM dynamic WHERE uid=?";
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 获取当前用户获取点赞的数量
router.get("/getlike", (req, res) => {
  let uid = req.query.uid;
  let sql = "SELECT SUM(likeCount) AS likeCount FROM dynamic WHERE uid=?";
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 导出表路由
module.exports = router;
