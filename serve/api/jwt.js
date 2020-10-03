const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
//token 类
class Jwt {
    constructor(data) {
        this.data = data
    }
    // 生成token
    generateToken() {
        let data = this.data
        //获得当前token创建的时间
        let created = Math.floor(Date.now()/1000)
        //从硬盘读取私钥准备加密
        let cert = fs.readFileSync(path.join(__dirname,'./pem/private_key.pem'))
        //生成token
        let token = jwt.sign ({
            //需要加密的对象
            data,
            //exp:过期时间
            exp: created + 60 * 30 //存储1小时
        },cert/*读取私钥*/,{algorithm:'RS256'}/*加密方式*/)
        return token
    }
    //检验token
    verifyToken () {
        let token = this.data
        //读取公钥
        let cert = fs.readFileSync(path.join(__dirname,'./pem/public_key.pem'))
        let res
        //验证【解密】token
        try {
            let result = jwt.verify(token,cert,{algorithm:['RS256']}) || {}
            if (current <= exp) {
                res = result.data || {}
            }
        } catch(e) {
            res = e
        }
        return res
    }
}
module.exports = Jwt