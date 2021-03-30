const user = require("./User.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');  

app.use(cookieParser());  
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post("/",async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  const token = jwt.sign({ email }, "uukn");
  const model = await user.User.findOne({ where: { email } });
  if (!model) {
    return res.send({ msg: "用户名不存在，请注册" });
  }
  const passwordValid = model.dataValues.password;
  if (password == passwordValid) {
    console.log("登陆成功");
    //TODO 执行登录成功后的操作，跳转页面，返回token
    // res.cookie("token",token,{maxAge: 900000, secure: false,path:'./'});
    res.send({
      status : 1,
      des : "登陆succeed",
      token : token
    })
  } else {
    //TODO 返回登录失败的愿意，前端提示
    res.send({status : 0 , des : "登陆失败"});
}})

  app.post("/auth",async (req, res) => {
    const token = req.headers.authorization.split(" ").pop();
    console.log(token);
    if (!token) {
      res.send({ status : 0,
      msg: "无token" });
    }
    const { email } = jwt.verify(token, "uukn");
    const model = await user.User.findOne({ where: { email } });
    if (!model) {
      res.send({ 
        status : 1,
        msg: "请注册" });
    }
    res.send({
      status : 2,
      msg:'权限校验成功'})
  })

  var server = app.listen(8081, function () {
    console.log("loginjs server on 8081");
  });
