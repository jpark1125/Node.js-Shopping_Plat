const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Cart",
    {
      cartId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(11),
        allowNull: false,
        references: {
          model: "Users", // User 모델을 참조
          key: "idx",
        },
      },
    },
    {
      sequelize,
      tableName: "carts",
      timestamps: false,
    }
  );
};
