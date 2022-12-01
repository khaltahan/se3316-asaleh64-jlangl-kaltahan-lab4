const router = require('express').Router();
const {User} = require('../models/user.model.js')
const Joi = require('joi');
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    try{
        // validate form data 
        const {error} = validate(req.body);
        // user attempting login 
        const user = await User.findOne({email:req.body.email})

        if(error){
            return res.status(400).send({
                message:err.message
            })
        }

        if(!user){
            return res.status(401).send({
                message:"Invalid Email or Password"
            })
        }

        // compare login passwor with user password 
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.status(401).send({
                message:"Invalid Email or Password"
            })
        }
        // generate authentication token for user on success
        const token = user.generateAuthToken()

        // send user daata 
        res.status(200).send({
            data:token, message:"Logged in Succesfully" 
        })
    }
    catch(err){
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
})

const validate = (data) =>{
    const schema = Joi.object({
        email:Joi.string().email().required().label('Email'),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(data);
}

module.exports = router;