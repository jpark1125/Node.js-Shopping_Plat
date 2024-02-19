var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _users = require("./user");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var user = _users(sequelize, DataTypes);

  return {
    board,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
