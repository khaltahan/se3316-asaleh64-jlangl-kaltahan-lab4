const express = require('express');
const router = express.Router();
const {User} =  require('../models/user.model.js')


router.get('/users',async (req, res)=>{
    try{
        const users = await User.find()
        res.send(users);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/make-admin/:email',async (req, res)=>{
    try{
        await User.findOneAndUpdate({email:req.params.email},
            {
            $set:{
                "is_admin":true
            }
        })
        const updatedList = await User.find({email:req.params.email})
        if(updatedList !=null){
            res.json("User is now Admin");
        }
        else{
            res.status(500).send({message:'User with email not found' })
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/deactivate/:email',async (req, res)=>{
    try{
        const users = await User.findOneAndUpdate({email:req.params.email},
            {
            $set:{
                "is_active":false
            }
        })
        
        res.json("User Deactivated");
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/activate/:email',async (req, res)=>{
    try{
        const users = await User.findOneAndUpdate({email:req.params.email},
            {
            $set:{
                "is_active":true
            }
        })
        res.json("User Activated");
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router;