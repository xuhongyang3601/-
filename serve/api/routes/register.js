const express = require("express");
const pool = require("../pool");
let router = express.Router();
router.post("/register", (req, res) => {
  let uname = req.body.username;
  let upwd = req.body.password;
  let sql = "SELECT uname FROM user WHERE uname=?";
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      //   将数据插入数据库user表
      pool.query(
        "INSERT INTO user(unick,uname,upwd,uavatar,ugender) VALUES (DEFAULT,?,MD5(?),DEFAULT,DEFAULT)",
        [uname, upwd],
        (err, result) => {
          if (err) throw err;
          res.send({ code: 200, msg: "注册成功", result: result });
        }
      );
    } else {
      res.send({ code: 400, msg: "用户已经存在" });
    }
  });
});
module.exports = router;
