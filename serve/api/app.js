//通过express创建服务器
const express = require("express");
const cors = require("cors");
let app = express();
app.listen(3030, () => {
  console.log("服务器已启动");
});

// 引入body-parser组件
const bodyParser = require("body-parser");
// app.use(
//   cors({
//     origin: [
//       "http://127.0.0.1:8080",
//       "http://localhost:8080",
//       "http://localhost:5000",
//       "http://192.168.1.108:5000",
//       "http://192.168.1.100:5000",
//       "*",
//     ],
//   })
// );

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//省份名路由
let regionPnameRouter = require("./routes/regionPname");
app.use("/api", regionPnameRouter);
//城市名路由
let regionCnameRouter = require("./routes/regionCname");
app.use("/api", regionCnameRouter);
// 动态详情列表路由
let dynamicsRouter = require("./routes/regionDynamics");
app.use("/api", dynamicsRouter);
// 首页路由
let indexRouter = require("./routes/indexData");
app.use("/api", indexRouter);
//登录路由
let loginRouter = require("./routes/login");
app.use("/api", loginRouter);
//注册路由
let registerRouter = require("./routes/register");
app.use("/api", registerRouter);

//个人中心路由
let userRouter = require("./routes/user");
app.use("/api", userRouter);

// 修改信息的路由
const modifyRouter = require("./routes/modify");
app.use("/api", modifyRouter);
// 动态点赞相关的路由
const islike = require("./routes/islike");
app.use("/api", islike);
