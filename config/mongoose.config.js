const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        // Use environment variables for flexibility and security
        const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/node-starter';

        // Set recommended Mongoose options
        const options = {
            
        };

        const dbConnection = await mongoose.connect(dbUrl, options);

        // Log connection details
        console.info(`Connected to database: ${dbConnection.connection.name} at ${dbConnection.connection.host}`);
    } catch (error) {
        // Handle errors with meaningful messages
        console.error('Failed to connect to the database:', error.message);

        // Optionally rethrow the error if needed
        throw error;
    }
};

module.exports = connectToDatabase;
