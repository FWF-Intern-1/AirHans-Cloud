const user = require("./User.js");
const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extened: false }));
app.post("/", async (req, res) => {
  console.log(req.body);
  const { account, password } = req.body;
  const model = await user.User.findOne({ where: { account } });
  if (!model) return res.send({ msg: "用户名不存在，请注册" });
  const passwordValid = model.dataValues.password;
  if (password == passwordValid) {
    return res.send({ msg: "登陆成功" });
  } else {
    return res.send({ msg: "密码错误" });
  }
});
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(host, port);
});

