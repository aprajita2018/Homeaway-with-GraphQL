var express = require('express');
var router = express.Router();
var User = require('../models/user');
//var {mongoose} = require('../db/mongoose');


//route to handle userSignup, encrypting the password using bcrypt, and insert the user details into the user table
router.post('*', function(req, res){
    console.log("Request received to create the user: " + req.body.email);
    var phone = req.body.phone || "";
    //var pwdHash;
    
    var newUser = new User({
        user_type: req.body.user_type,
        f_name: req.body.fname,
        l_name: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        phone_num: phone,
        joined_date: new Date().toISOString(),
    });

    console.log(newUser);

    User.createUser(newUser, function(err, user){
        console.log("Inside Create User function!");
        if(err){
            res.code = "400";
            res.value = "ERROR: Couldn't create the user.";
            console.log(res.value);
            res.sendStatus(400).end();
        }
        else{
            console.log("Successfuly created the user in db!");
            
            res.status(200).send({status: "SUCCESS", message: "User successfully created"});
        };        
    });
});


module.exports = router;
