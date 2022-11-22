const router = require('express').Router();
const{User,validate} = require('../models/user_model.js')
const bcrypt = require('bcrypt')

router.post("/", async (req, res)=>{
    try{
    //    const {error} = validate(req.body);
    //    if(error){
    //     return res.status(400).sendFile({message:error})
    //    }
       const user = await User.findOne({email:req.body.email})
       if(user){
        return res.status(409).send({message:"User with email already exists"})
       }
       

       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new User({
                name:req.body.name,
                email:req.body.email,
                password:hashPassword
            }).save()
       res.status(200).send({message:"User Created Succesfully"})
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

module.exports = router;