const { DataTypes, Sequelize, Op } = require("sequelize");
const user = require("./User.js");
console.log(user.User);
//插入数据
function createpeople(ac, pwd, email) {
  user.User.create({
    account: ac,
    password: pwd,
    email: email,
  });
}
module.exports.createpeople = createpeople;
