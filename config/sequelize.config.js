const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('nodeStarter', 'root', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Sequelize: Connection has been established successfully.');
    } catch (error) {
        console.error('Sequelize: Unable to connect to the database:', error);
    }
})();

module.exports = sequelize; // Export the instance directly
