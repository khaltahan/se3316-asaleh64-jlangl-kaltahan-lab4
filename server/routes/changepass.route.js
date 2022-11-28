// router object 
const router = require('express').Router();
// user model
const {User} = require('../models/user.model.js');
// password hashing
const bcrypt = require('bcrypt');

// set route 
router.post('/', async (req,res) => {
    // password hashing 
    const salt = await bcrypt.genSalt(10);
    // body data 
    const currentPass = req.body.currentPassword;
    const newPass = req.body.newPassword;
    const newPassConfirm = req.body.confirmPassword;
    // user to update 
    const user = await User.findById(req.body.user)
    // check if user exists 
    if (!user) {
        // error mesage
        return res.status(401).send({
            message:"Invalid Permission, Please Create An Account"
        });
    }
    else {
        // confirm old password and new password entries   
        if(currentPass == user.password && newPass == newPassConfirm){
            // hash the new password and update 
            newPass = await bcrypt.hash(newPass,salt);
            user.password = newPass;
            await user.save();
            alert("password changed");
            return res.status(200).send({
                message:"Password Changed!"
            });
        }
        // error messages 
        else{
            if (currentPass != newPass){
                alert("invalid password");
                return res.status(400).send({
                    message:"Invalid password"
                });
            }
            if (newPass != newPassConfirm){
                alert("passwords do not match");
                return res.status(400).send({
                    message:"Passwords do not match"
                });
            }
        }
    }
});
// export route for application user
module.exports = router;