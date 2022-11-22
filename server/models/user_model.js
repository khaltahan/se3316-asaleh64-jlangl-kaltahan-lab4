const mongoose = require('mongoose')

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

module.exports = mongoose.model('Users',userSchema)