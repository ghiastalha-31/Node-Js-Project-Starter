const { v4: uuidv4 } = require('uuid');
checkExistingUserQueryObject = async(req) => {
    try {
        let filter = {
            phone: req.body.phone
        }
        return filter
    } catch (err) {
        throw err
    }
}
insertUserQueryObject = async (req) => {
    try {
        const queryObject = {
            "uuid": uuidv4(),
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "phone": req.body.phone,
            "appVersion": req.body.appVersion,
            "lang": req.body.lang,
            "role": req.body.role,
            "countryName" : req.body.countryName,
            "countryCode": req.body.countryCode,
            "dialingCode": req.body.dialingCode
        }

        return queryObject;
    } catch (err) {
        throw err
    }

}


module.exports = {
    checkExistingUserQueryObject: checkExistingUserQueryObject,
    insertUserQueryObject: insertUserQueryObject
}