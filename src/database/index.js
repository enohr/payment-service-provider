const { Sequelize } = require('sequelize');

const database = {}

database.sequelize = new Sequelize('postgres://databaseuser:databasepassword@localhost:5432/PSP', {
    logging: false
})

const authenticate = async () => {
    try {
        await database.sequelize.authenticate;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

database.auth = authenticate;

module.exports = database;

