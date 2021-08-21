const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try {

        if (req.body.user.role === 'admin') {
            next();
        } else {
           res.send({ error: "Unauthorized Operations" }).status(401)
        }
    } catch (err) {
        // err
        res.send({ error: "Auth failed" }).status(401);
    }
}

module.exports = verifyToken;