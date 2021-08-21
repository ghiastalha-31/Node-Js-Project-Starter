const jwt = require("jsonwebtoken")
const helperFunctions  = require('../utils/common.functions')


const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ');

        const decoded = jwt.verify(token[1], process.env.JWT_TOKEN_SECRET, {algorithms: 'HS256'});

        if (decoded.role === 'user' || decoded.role === 'expert') {
            req.body.user = {};
            req.body.user.phone = decoded.phone;
            req.body.user.userId = decoded.userId;
            req.body.user.role = decoded.role;
            next();
        } else {
            return helperFunctions.returnResponse({}, 'Auth failed.', true, 401, res)
        }
    } catch (err) {
        // err
        helperFunctions.returnResponse({}, 'Auth failed.', true, 401, res)
    }
}

module.exports = verifyToken;