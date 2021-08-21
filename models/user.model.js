
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/*
*
*
* User schema
*
*/

const UserSchema = new Schema({
    "uuid": {type: String, required: true},
    "firstName": String,
    "lastName": String,
    "phone": String,
    "appVersion": String,
    "lang": String,
    "role": { type: String, enum:['user','vendor']},
    "isVerified": { type: Boolean, enum: [true, false], default: false },
    "status": { type: String, enum: ['active', 'block'], default: 'block' },
    "countryName": String,
    "countryCode": String,
    "dialingCode": String,
});


/*
*
*
* User model
*
*/


class user {
    static async registerUser(data){
        try{
            let user = this.create(data)
            return user
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async findUser(id){
        try{
            let user = this.findOne({uuid: id}).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async deleteUsers(id){
        try{
            let user = this.findOneAndDelete({uuid: id}).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async updateSingleUserData(filter, update){
        try{
            let user = this.findOneAndUpdate(filter, update, {
                new: true,
                safe: true
            }).lean()
            return user;
        }
        catch(err){
            console.log(err)
        }
    }

    static async findExistingUserByQuery(query){
        try{
            let user = this.findOne(query).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }
}
UserSchema.loadClass(user)
let users = mongoose.model('users', UserSchema);
module.exports = users;
