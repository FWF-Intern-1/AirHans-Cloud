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
//读取整个表

// async function users(){
//   return await user.User.findAll();
// }
// async function sayUsers(){
//   console.log(JSON.stringify(await users()))
// }
// sayUsers();
// users.findAll({
//   where:{
//     id:1
//   }
// })

//根据字段查找
async function find() {
  return user.User.findAll({
    attributes: ["account"],
    where: {
      id: {
        [Op.eq]: 1,
      },
    },
  });
}
async function sayfind(){
  console.log(JSON.stringify(await find()))
}
sayfind();

(async () => {
  console.log(
    JSON.stringify(
      await user.User.findAll({
        attributes: ["account"],
        where: {
          id: {
            [Op.eq]: 1,
          },
        },
      })
    )
  );
})();

module.exports.createpeople = createpeople;
//module.exports.users = sayUsers;
