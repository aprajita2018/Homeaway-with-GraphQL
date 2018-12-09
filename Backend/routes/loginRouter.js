var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken'); 
var config = require('../config/config');
//var {mongoose} = require('../db/mongoose');

//handle login using passport & jwt tokens
router.post('*', (req, res, next) =>{
    var email = req.body.email;
    var pwd = req.body.password;
    var user_type = req.body.user_type;

    User.getUserByEmail(email, user_type, (err, user) => {
        if(err) throw err;
        if(!user){
            console.log("User not found");
            res.status(500).send({success: false, status: "ERROR", message:"User not found"});
        }
        else{
            console.log(user);
            User.comparePassword(pwd, user.password, (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign(user.toJSON(), config.secret,{
                        expiresIn: 24*60*60
                    });
                    console.log("Found the user in DB!");
                    res.cookie('name',user.f_name + " " + user.l_name,{maxAge: 900000, httpOnly: false, path : '/'});           
                    res.status(200).send({
                        success: true,
                        status: "SUCCESS",
                        token: token,
                        user:{
                            id: user._id,
                            name: user.f_name + ' ' + user.l_name,
                            user_type: user.user_type,
                        }
                    });
                }
                else{
                    console.log("Wrong Password!");
                    res.status(500).send({success: false, status: "ERROR", message: 'Wrong Password!'});
                }
            });
        }
    });    
});

module.exports = router;