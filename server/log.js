const user = require("./User.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');  
const bcrypt = require("bcryptjs")

app.use(cookieParser());  
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extened: false }));

app.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.setHeader("Access-Control-Allow-Origin", "*");//必须设置成与请求一致的域名
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET,OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  const token = jwt.sign({ email }, "uukn");
  const model = await user.User.findOne({ where: { email } });
  if (!model) {
    res.send({ msg: "用户名不存在，请注册" });
  }
  console.log(model.dataValues)
  const passwordValid = bcrypt.compareSync(bcrypt.hashSync(password,5),model.dataValues.password);
  if (!passwordValid) {
    console.log("登陆成功");
    //TODO 执行登录成功后的操作，跳转页面，返回token
    res.send({
      status : 1,
      des : "登陆succeed",
      token : token
    })
  } else {
    //TODO 返回登录失败的愿意，前端提示
    res.send({status : 0 , des : "登陆失败"});
    res.end()
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
