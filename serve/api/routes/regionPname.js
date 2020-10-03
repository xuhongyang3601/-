const express = require('express')
const pool = require('../pool')
let router = express.Router()
router.get('/regionpname',(req,res)=>{
    pool.query('SELECT pname FROM region_data',[],(err,result)=>{
        if (err) throw err
        let results = []
        result.forEach(element => {
            results.push(element.pname)
        });
        let arr = (Array.from(new Set(results)))
        res.send({"code":200,"msg":"请求成功","data":{"pname":arr}})
    })
})
module.exports = router