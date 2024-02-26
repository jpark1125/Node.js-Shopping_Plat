const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Users",
    {
      idx: {
        autoIncrement: true,
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(180),
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      userType: {
        type: ENUM("buyer", "seller"),
        allowNull: false, //db에 아직 추가 안함
      },
      passwd: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      refreshtoken: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
      // indexes: [
      //   {
      //     name: "PRIMARY",
      //     unique: true,
      //     using: "BTREE",
      //     fields: [{ name: "idx" }],
      //   },
      // ],
    }
  );
};
