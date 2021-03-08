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

Payable.belongsTo(Transaction, {
  foreignKey: 'transaction_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

module.exports = {Payable}