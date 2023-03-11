'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_tradings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock_symbol: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      total_transaction: {
        type: Sequelize.INTEGER
      },
      total_traded_shares: {
        type: Sequelize.INTEGER
      },
      total_traded_amount: {
        type: Sequelize.INTEGER
      },
      max_price: {
        type: Sequelize.DECIMAL
      },
      min_price: {
        type: Sequelize.DECIMAL
      },
      close_price: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_tradings');
  }
};