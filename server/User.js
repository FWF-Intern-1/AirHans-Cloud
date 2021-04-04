const { Sequelize, DataTypes ,Op} = require("sequelize");
const sequelize = new Sequelize("user", "root", "ZHANGbo020329", {
  host: "localhost",
  //port:'22',
  dialect: "mysql",
});
//const sequelize = new Sequelize('mysql://root:ZHANGbo020329@8.131.49.251:22/User');

(async function () {
  await sequelize.sync({ alter: true })
//   .then(async () => {
//   console.log("database synced");
//   const user1 = await User.create({
//     account: "Yun",
//     email: "111@email.com",
//     password: "123",
//   })
//   const user2 = await User.create({
//     account: "Hans",
//     email: "222@email.com",
//     password: "123",
//   })
//   const comment = await Comment.create({
//     account:"Yun",
//     content:"123",
//     receiver:"Hans"
//   })
//   // console.log((await user.reload()).toJSON())
//   // console.log((await comment.reload()).toJSON())
// })
})();


const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: "account",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
    },
    password: {
      type: DataTypes.STRING(800),
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
    },
    profile: {
      type: DataTypes.STRING(300),
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

console.log("User created!");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: DataTypes.STRING(16),
      allowNull: false,
      references: {
        model: User,
        as: "comments",
      },
    },
    content: {
      type: DataTypes.STRING(800),
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING(16),
      allowNull:false
    },
  },
  {
    sequelize,
    modelName: "Comment",
    updatedAt: false,
  }
);

//一对多关联（外键在Comment）
User.hasMany(Comment, {
  foreignKey: "account",
  sourceKey: "account",
  as:'Sender'
});
Comment.belongsTo(User, {
  foreignKey: "account",
  targetKey: "account",
  onUpdate: "CASCADE",
  as:'Sender'
});

User.hasMany(Comment, {
  foreignKey: "receiver",
  sourceKey: "account",
  as:'Receiver'
});
Comment.belongsTo(User, {
  foreignKey: "receiver",
  targetKey: "account",
  onUpdate: "CASCADE",
  as:'Receiver'
});



module.exports.User = User;
module.exports.Comment = Comment;
module.exports.sequelize = sequelize;

