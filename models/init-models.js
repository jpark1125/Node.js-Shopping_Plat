var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _users = require("./user");
var _cart = require("./cart");
var _cartItem = require("./cartitem");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var user = _users(sequelize, DataTypes);
  var cart = _cart(sequelize, DataTypes);
  var cartItem = _cartItem(sequelize, DataTypes);

  // 모델 간 관계 설정(예시)
  // cart.belongsTo(user, { foreignKey: "userId" });
  // cartItem.belongsTo(cart, { foreignKey: "cartId" });
  // cartItem.belongsTo(board, { foreignKey: "boardId" });

  return {
    // 초기화된 모델을 반환
    board,
    user,
    cart,
    cartItem,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
