const jwt = require('jsonwebtoken');

const verifyOTPToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers['X-Rasoi-Token'];
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_OTP_SECRET);
        if (decoded.role === 'otpVerify') {
            req.body.user = {};
            req.body.user.phone = decoded.phone;
            req.body.user.userId= decoded.userId;
            req.body.user.role = decoded.userRole
            next();
        } else {
          res.send({error:"Auth failed"}).status(401)
        }

    } catch (err) {
        // err
        res.send({error:"Auth failed"}).status(401);
    }
}

module.exports = verifyOTPToken;