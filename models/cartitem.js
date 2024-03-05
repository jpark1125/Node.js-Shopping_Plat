const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "CartItem",
    {
      itemId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cart", // Cart 모델을 참조
          key: "cartId",
        },
      },
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Board", // Board 모델을 참조
          key: "idx",
        },
      },
    },
    {
      sequelize,
      tableName: "cart_items",
      timestamps: false,
    }
  );
};
