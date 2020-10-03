const express = require("express");
const pool = require("../pool");
const router = express.Router();
router.get("/user", (req, res) => {
  let uid = req.query.uid;
  pool.query("SELECT * FROM user WHERE uid=?", [uid], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "请求成功", data: result });
  });
});
// 获取已登录用户的uid
router.get("/islogin", (req, res) => {
  let uname = req.query.uname;
  let sql = "SELECT uid FROM user WHERE uname=?";
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "查询成功", result });
  });
});
module.exports = router;
