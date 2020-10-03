const express = require("express");
const pool = require("../pool");
const r = express.Router();

// 获取当前用户是否点赞当前文章
r.get("/likeState", (req, res) => {
  let uid = req.query.uid;
  let sql = "SELECT did  FROM islike WHERE uid = ?";
  // 返回的did就是当前用户点赞的动态id
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 用户点赞时插入点赞表的接口
r.post("/like", (req, res) => {
  // 获取当前用户点赞的id和当前点赞文章的id
  let uid = req.body.uid;
  let did = req.body.did;
  let sql = "INSERT INTO islike(did,uid) VALUES(?,?)";
  pool.query(sql, [did, uid], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "修改成功" });
  });
});
//用户点赞时插入动态表的接口
r.get("/dlike", (req, res) => {
  // 获取用户点赞的动态id
  let did = req.query.did;
  // 获取当前动态的点赞数量
  let likeCount = req.query.likeCount;
  likeCount++;
  let sql = "UPDATE dynamic SET likeCount=? WHERE did=?";
  pool.query(sql, [likeCount, did], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "修改成功", result: likeCount });
    // res.send(result);
  });
});
module.exports = r;
