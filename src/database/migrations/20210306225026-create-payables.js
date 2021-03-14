'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return await queryInterface.createTable('Payables', {
      payable_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      transaction_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "Transactions", 
          key: "transaction_id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      price: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.ENUM('waiting_funds', 'paid'),
        allowNull: false
      },
      payment_date: {
        type: Sequelize.DATE
      },
    },
    {
      timestamps: false,
    });

  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('Payables');
  }
};
