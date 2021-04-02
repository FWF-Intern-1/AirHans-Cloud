const Op = require("sequelize");
const express = require("express");
const user = require("./User.js");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extened: false }));
app.listen(8082, function () {
  console.log("com_logic server on 8082");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const { content, account, receiver } = req.body;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  const model = await user.User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      account,
    },
    include: {
      model: user.Comment,
       as: "Sender",
    },
  });
  await model.createSender({ 
    account:account,
    content:content,
    receiver:receiver
   });
  res.send({ msg: "收到啦！" });
});

//查找功能
app.post("/search", async (req, res) => {
  console.log(req.body);
  const { account } = req.body;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  const model = await user.User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      account,
    },
    include: {
      model: user.Comment,
       as: "Sender",
    },
  });
  let w="";
  for(var i =0 ;i < model.Sender.length;i++){
    w+=JSON.stringify(model.Sender[i].dataValues)

    console.log(model.Sender[i].dataValues)
  }
  res.end(w);
});
