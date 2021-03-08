const { DataTypes } = require('sequelize')
const { sequelize } = require("..");
const { Transaction } = require('./transaction');


const Payable = sequelize.define('Payables', {
    payable_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      transaction_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Transaction", 
          key: "transaction_id"
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('waiting_funds', 'paid'),
        allowNull: false
      },
      payment_date: {
        type: DataTypes.DATE
      },
    },
    {
      timestamps: false,
  })

Payable.belongsTo(Transaction)

module.exports = {Payable}