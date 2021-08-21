const Joi = require('joi');
// const { Joi } = require('express-validation')


const registrationValidation = Joi.object().keys({
    firstName: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    phone: Joi.string()
        .required(),
    appVersion: Joi.string()
        .required(),
    lang: Joi.string()
        .required(),
    countryName: Joi.string()
        .required(),
    countryCode: Joi.string()
        .required(),
    dialingCode: Joi.string()
        .required(),
    role: Joi.string()
        .required()
})

const loginValidation = Joi.object().keys({
    phone: Joi.string()
        .required(),
    appVersion: Joi.string()
        .required(),
    lang: Joi.string()
        .required(),
    role: Joi.string()
        .required()
})
const otpVerification = Joi.object().keys({
    otp: Joi.number()
        .min(1000)
        .max(9999)
        .required()
})


const middleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            console.log('details', details)
            const message = details.map(i => i.message).join(',');

            console.log("error", message);
            res.status(422).json({ error: message }) }
    }
}
module.exports = {
    registrationValidation,
    loginValidation,
    otpVerification,
    middleware

}



