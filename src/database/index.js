const { Sequelize } = require('sequelize');

const connectDb = async () => {
    const sequelize = new Sequelize(
    'postgres://databaseuser:databasepassword@localhost:5432/PSP',
    )
    return sequelize;
}

module.exports = { connectDb };

