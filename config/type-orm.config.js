const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'username', // change this username
    password: 'password', // change this password
    database: 'databasename', // Change the database name 
    synchronize: true,
    entities: [__dirname + '/entities/*.js'],
});

const initializeDataSource = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
    }
};

module.exports = initializeDataSource;
