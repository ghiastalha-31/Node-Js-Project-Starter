const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk/index');
const randomString = require('randomstring');
const s3 = new AWS.S3({
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_key
});

function returnResponse(data, message, error, status, res) {
    res.status(status).send({
        data: data,
        message: message,
        error: error
    })
}

async function generateJWTToken(userData){
    try{

        const token = await jwt.sign(userData,  process.env.JWT_TOKEN_SECRET, { expiresIn: '6 days' });
        // console.log('token', token)
        return token;

    }catch(err){
        throw err
    }

}

const comparePassword = async (password, hashPassword) => {

    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, hashPassword, function (err, res) {
            if (err) {
                console.log("RES ERR", err);
                return reject(err);
            } else {
                return resolve(res);
            }
        });
    })

};
const uploadImageOnAWS =  async (requestObject, imageFrom) => {


    let randomName = randomString.generate({
        length: 30,
        numeric: true,
        letters: true,
        special: false,
        exclude: ['/', '$']
    });
    let uploadedFile = requestObject;
    console.log('uploadedFile', uploadedFile.data)
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    let imageToUpload = randomName + '.' + fileExtension;
    let subFolder = ''
    if (imageFrom === 'brandLogo'){
        subFolder = process.env.brands_logo_path
    }

    let key = subFolder + imageToUpload;

    if (uploadedFile.mimetype === "image/jpeg" || uploadedFile.mimetype === "image/png" || uploadedFile.mimetype === "image/jpg") {

        const params = {
            Bucket: process.env.aws_assets_bucket,
            Key: key,
            ACL: process.env.FILE_PERMISSION,
            ContentType: process.env.ContentType,
            StorageClass: process.env.aws_storage_class,
            Body: uploadedFile.data
        };


        s3.upload(params, function (err, responseData) {
            if (err) {
                console.log(err);
                return err;
            } else {
                // console.log('data', data)
                //fullfill(imageToUpload);
            }
        });

    } else {
        return 'image type is not correct'
    }

    return imageToUpload;


}
module.exports = {
    returnResponse: returnResponse,
    generateJWTToken: generateJWTToken,
    uploadImageOnAWS: uploadImageOnAWS,
    comparePassword: comparePassword
}