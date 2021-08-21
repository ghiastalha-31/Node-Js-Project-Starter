/*
*
*  Express http framework
*
*/
const express = require('express');
const fileUpload = require('express-fileupload');

/*
*
*  Load environment variables
*
*/
require('dotenv').config()

/*
*
* Db configuration
*
*/

require('./config/mongoose.config')();

/*
*
* Express instance
*
*/
const app = express();
app.use(fileUpload());

/*
*
* configure express
*
*/

require('./config/express.config')(app);

require('./routes/index')(app);
/*
*
* Initiate server
*
*/



require('./server')(app);