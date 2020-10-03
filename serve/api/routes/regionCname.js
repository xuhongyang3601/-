const express = require('express')
const pool = require('../pool')
let router = express.Router()
router.get('/regioncname',(req,res)=>{
    let pname = req.query.pname
    pool.query('SELECT cname FROM region_data WHERE pname=?',[pname],(err,result)=>{
        if (err) throw err
        res.send({"code":200,"msg":"请求成功","data":result})
    })
})
module.exports = router