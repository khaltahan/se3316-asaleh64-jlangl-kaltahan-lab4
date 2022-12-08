const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')
require("dotenv").config();


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Boolean,
        default:false
    },
    is_active:{
        type:Boolean,
        default:true
    }

})

userSchema.methods.generateAuthToken = function(){
    try{
        const token = jwt.sign(
            {_id:this._id, email:this.email, admin:this.is_admin,active:this.is_active},
            process.env.JWT,
            {expiresIn:"7d"})
        return token;
    }
    catch(e){
        console.log(e)
    }
}

const User = mongoose.model('Users',userSchema)

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(data)
}

module.exports = {User,validate}