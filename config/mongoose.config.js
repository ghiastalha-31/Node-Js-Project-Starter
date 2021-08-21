const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const url = `mongodb://localhost:27017/db-name`;
        const dbConnection = await mongoose.connect(url, {
            useNewUrlParser: true.valueOf,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        if(dbConnection)
        {
            console.info('connected to db: DATABASE NAME')
        }else{
            console.warn('disconnected the database')
        }
    } catch (error) {
        throw new Error(error);
    }
}