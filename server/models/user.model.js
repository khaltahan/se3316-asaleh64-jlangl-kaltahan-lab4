const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    is_admin:Boolean,
    is_active:Boolean,

})

userSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id:this._id, email:this.email}, process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
return token;
}

const User = mongoose.model('Users',userSchema)

const validate = (data) =>{
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(data)
}

module.exports = {User,validate}