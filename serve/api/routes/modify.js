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
    let path = "public/avatar";
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
const r = express.Router();
r.post("/modify", (req, res) => {
  let uid = req.body.uid;
  let obj = req.body;
  let sql = "UPDATE user SET ? WHERE uid=?";
  pool.query(sql, [obj, uid], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "修改成功" });
  });
});
//用户修改头像的路由
r.post("/avatar", upload.single("img"), (req, res) => {
  let uid = req.body.uid;
  let dimg = req.file.path.replace("public", "");
  let sql = "UPDATE user SET uavatar=? WHERE uid=?";
  pool.query(sql, [dimg, uid], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "修改成功" });
  });
});
// 导出路由
module.exports = r;
