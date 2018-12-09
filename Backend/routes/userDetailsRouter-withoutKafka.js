var express = require('express');
var router = express.Router();
var User = require('../models/user');
//var {mongoose} = require('../db/mongoose');
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

//handle the userDetails and fetch all the details for a user
router.get('*', verifyToken, function(req, res){
    console.log("Will try to verify token: " + req.token + " using secret " + config.secret);
    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            User.getUserByEmail(token_payload.email, token_payload.user_type, (err, user) => {
                if(err) throw err;
                if(!user){
                    console.log("User not found");
                    res.status(500).send({auth: false, message:"User not found"});
                }
                res.status(200).send({auth: true, user});
            })
        }
    });    
});

module.exports = router;
