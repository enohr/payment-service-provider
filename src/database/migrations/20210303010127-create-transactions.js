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
        transaction_description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        payment_method: {
            type: Sequelize.DataTypes.ENUM('debit', 'credit'),
            allowNull: false,
        },
        card_last_digts: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 4,
                max: 4
            }
        },
        card_owner_name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        card_valid_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        cvv: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },

    })
  },

  down: async (queryInterface, Sequelize) => {
      return await queryInterface.dropTable('Transactions');
  }
};
