// router object 
const router = require('express').Router();
// user model
const {User,validate} = require('../models/user.model.js');
// password hashing
const bcrypt = require('bcrypt');
// validate complextiy of password 
const passwordComplexity = require('joi-password-complexity');

// set route 
router.post('/', async (req,res) => {
    // hashing for password 
    const salt = await bcrypt.genSalt(10);
    // request body data 
    const currentPass = req.body.currentPass;
    const newPass = await bcrypt.hash(req.body.newPass,salt);
    const confirmPass = req.body.confirmPass
    // user requesting password change
    const user = await User.findOne({ 
        _id:req.body.id
    })
    // check if user requesting the endpoint is valid
    if (!user) {
        // error mesage
        return res.status(401).send({
            message:"Invalid Permission, Please Create An Account"
        });
    }
    else {
        // check if user knows their old password 
        bcrypt.compare(currentPass, user.password)
        .then( function (result) {
            if (result == true) {
                // check if new password is not the same as previous password 
                bcrypt.compare(currentPass, newPass)
                .then(function(result){
                    if (result == true) {
                        return res.status(400).send({
                            message:"Cannot use old password"
                        })
                    }
                    else{
                        // check that valid password is of valid complexity 
                        if (passwordComplexity().validate(req.body.newPass).error !== undefined){
                            let msg = passwordComplexity().validate(req.body.newPass).error.message.replace(/['"]+/g,'')
                            msg = msg.replace(new RegExp('value', 'g'), 'Password')
                            return res.status(400).send({
                                message:msg
                            })
                        }
                        else{
                            // confirm password matching 
                            bcrypt.compare(confirmPass, newPass)
                            .then(function(result) {
                                if (result == true){
                                    console.log("Password Has Been Changed")
                                    // update user password 
                                    user.password = newPass
                                    user.save()
                                    return res.status(200).send({
                                        message:"Password changed !"
                                    })
                                }
                                else{
                                    // return error in matching passwords 
                                    return res.status(400).send({
                                        message:"Passwords do not match"
                                    })
                                }
                            })
                        }
                    }
                })
            }
            else{
                return res.status(400).send({
                    message:"Invalid Password"
                })
            }
        })
    }
});
// export route for application user
module.exports = router;