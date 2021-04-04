const user = require("./User.js");
const bcrypt = require("bcryptjs")
//插入数据
async function createpeople (ac, pwd, email) {
  let cp = await user.User.create({
    account: ac,
    password: bcrypt.hashSync(pwd,5),
    email: email,
  });
}
module.exports = {
  createpeople
}