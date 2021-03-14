'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return await queryInterface.createTable('Transactions', {
        transaction_id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        transaction_price: {
            type: Sequelize.DataTypes.REAL,
            allowNull: false,
        },
        transaction_description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        cnpj_seller: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        payment_method: {
            type: Sequelize.DataTypes.ENUM('debit', 'credit'),
            allowNull: false,
        },
        card_last_digits: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        card_owner_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        card_valid_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
        cvv: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
      return await queryInterface.dropTable('Transactions');
  }
};
