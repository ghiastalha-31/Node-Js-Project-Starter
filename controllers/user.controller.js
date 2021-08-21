const {  userModel } = require('../models/index')
const userService  = require('../service/users.service')

const helperFunctions  = require('../utils/common.functions')


const signup = async (req, res) => {
    try {

        /*
        *
        *  Get user data
        *
        *
        */
        const {
            phone,
            role
        } = req.body;

        const checkUser = await userModel.findExistingUserByQuery({phone: phone, role: role})
        if (checkUser) {
            await helperFunctions.returnResponse({}, 'User already exist', true, 403, res)

        } else {
            const userData = await userService.insertUserQueryObject(req)
            const user = await userModel.registerUser(userData);

            if (user) {
                // const randomOTP = Math.floor(1000 + Math.random() * 9000);
                const randomOTP = parseInt(1111)
                await otpModel.create({ otp: randomOTP, userId: user.uuid, phone: user.phone, generatedAt: new Date() });
                const token = await helperFunctions.generateJWTToken({ phone: phone, role: role, userId: user.uuid })
                res.set({'token': token})
                return await helperFunctions.returnResponse({'token': token}, 'User created and otp sent to number', false, 200, res)
            }
            else {
                return await helperFunctions.returnResponse({}, 'Failed to create a user', true, 403, res)
            }

        }
    } catch (error) {
        await helperFunctions.returnResponse({}, error.message, true, 403, res)
    }
}


const login = async (req, res) => {
    try {

        const {
            phone,
            role
        } = req.body;
        const checkUser = await userModel.findExistingUserByQuery({phone: phone, role: role})
        if (checkUser) {
            // const randomOTP = Math.floor(1000 + Math.random() * 9000);
            const randomOTP = parseInt(1111)
            await otpModel.create({ otp: randomOTP, userId: checkUser.uuid, phone, generatedAt: new Date()  });
            const token = await helperFunctions.generateJWTToken({ phone: phone, role: checkUser.role, userId: checkUser.uuid });
            res.set({'token': token})
            return await helperFunctions.returnResponse({"token": token}, 'otp sent to number', false, 200, res)


        } else {
            return await helperFunctions.returnResponse({}, 'User not found', true, 403, res)
        }

    } catch (error) {
        res.send(error)
    }
}




module.exports = {
    signup,
    login
}