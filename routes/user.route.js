const userCtl = require('../controllers/user.controller');
const verifyOtp = require('../middleware/otpVerify.middleware')
const auth = require('../middleware/auth.middleware')
const { validate } = require('express-validation')
const validations = require('../validations/user.validation')

module.exports = (app) => {

    app.post('/user/signup', validations.middleware(validations.registrationValidation),userCtl.signup);
    app.post('/user/login',validations.middleware(validations.loginValidation),  userCtl.login);

}