const { DataTypes, Sequelize } = require("sequelize");
const db = new Sequelize("test", "root", "ZHANGbo020329", {
  host: "localhost",
  dialect: "mysql",
});
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
//读取整个表
//const users = await user.User.findAll();
//return await user.User.findAll();
// async function users(){
//   return await user.User.findAll();
// }
async function users(){
  return await user.User.findAll();
}
async function sayUsers(){
  console.log(JSON.stringify(await users()))
}
sayUsers();
//console.log(users.every(user => user instanceof User)); // true
//console.log("All users:", JSON.stringify(uuser()));

module.exports.createpeople = createpeople;
//module.exports.users = user;
