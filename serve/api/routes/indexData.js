const { count } = require("console");
const express = require("express");
const pool = require("../pool");
const r = express.Router();

// 首页疫情数据的显示
r.get("/indexData", (req, res) => {
  // 根据用户切换的城市显示指定的数据
  let cname = req.query.cname;
  let pname = req.query.pname;
  let sql =
    "SELECT pname,cname,confirm,suspect,heal,dead FROM region_data WHERE cname=? AND pname=?";
  pool.query(sql, [cname, pname], (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "请求成功", data: result });
  });
});
// 首页折线图的显示
r.get("/total", (req, res) => {
  // 只获得当天前一个星期的数据
  let sql =
    "SELECT insert_date,confirm,suspect,heal,dead,input FROM country_data ORDER BY insert_date DESC LIMIT 0,5";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ code: 200, msg: "请求成功", data: result });
  });
});
// 首页文章表
r.get("/article", (req, res) => {
  let page = req.query.page;
  let count = 10;
  sql = "SELECT count(aid) pageCount FROM article";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    let pageCount = Math.ceil(result[0].pageCount / count);
    // console.log(pageCount);
    sql = `SELECT aid,asubject,aimg,aconment,atime,aimport,type FROM article LIMIT ${
      (page - 1) * count
    },${count}`;
    pool.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ code: 200, msg: "请求成功", data: result, pageCount });
    });
  });
});

module.exports = r;
