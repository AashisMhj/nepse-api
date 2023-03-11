'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_trading extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stock_trading.init({
    stock_symbol: DataTypes.STRING,
    company_name: DataTypes.STRING,
    date: DataTypes.DATE,
    total_transaction: DataTypes.INTEGER,
    total_traded_shares: DataTypes.INTEGER,
    total_traded_amount: DataTypes.INTEGER,
    max_price: DataTypes.DECIMAL,
    min_price: DataTypes.DECIMAL,
    close_price: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'stock_trading',
  });
  return stock_trading;
};