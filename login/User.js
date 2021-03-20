const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("test", "root", "ZHANGbo020329", {
  host: "localhost",
  dialect: "mysql",
});
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    nick_name: {
      type: DataTypes.STRING(25),
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
    },
    profile: {
      type: DataTypes.STRING(300),
    },
    power: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);
module.exports.User = User;

User.sync({alter : true});
console.log("created!");
