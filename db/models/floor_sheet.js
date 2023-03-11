'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class floor_sheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  floor_sheet.init({
    contact_no: DataTypes.INTEGER,
    stock_symbol: DataTypes.STRING,
    buyer: DataTypes.INTEGER,
    seller: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    rate: DataTypes.DECIMAL,
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'floor_sheet',
  });
  return floor_sheet;
};