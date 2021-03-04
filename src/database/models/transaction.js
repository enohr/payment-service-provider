const { DataTypes } = require('sequelize')
const { sequelize } = require('../index')

const Transaction = sequelize.define('Transaction', {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        transaction_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transaction_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.ENUM('debit', 'credit'),
            allowNull: false,
        },
        card_last_digits: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        card_owner_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        card_valid_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cvv: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

})

module.exports = {Transaction};