const user = require("./User.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extened: false }));
app.listen(8081, function () {
  console.log("loginjs server on 8081");
});

app.post("/", async (req, res) => {
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
    res.send({ msg: "用户名不存在，请注册" });
  }
  const passwordValid = model.dataValues.password;
  if (password == passwordValid) {
    console.log("登陆成功");
    console.log(token);
    res.cookie("email", {email:email, token: token}, {maxAge: 600000});
        //TODO 执行登录成功后的操作，跳转页面，返回token
  } else if (password !== passwordValid) {
    console.log("登陆失败");
    //TODO 返回登录失败的愿意，前端提示
    res.send({ msg: "密码错误", status: 0 });
  }

  res.send({ token });
});

app.post("/auth", async (req, res) => {
  const token = req.headers["authorization"].split(" ").pop();
  //const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    res.send({ msg: "无token", status: 0 });
  }
  const { email } = jwt.verify(token, "uukn");
  const model = await user.User.findOne({ where: { email } });
  if (!model) {
     res.send({ msg: "请注册", status: 1 });
  }
   res.send({ msg: "权限校验成功", status: 2 });
});

