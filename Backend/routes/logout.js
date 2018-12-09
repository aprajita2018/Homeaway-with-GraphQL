var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); 
var config = require('../config/config');
var verifyToken = require('../middleware/verifyToken');

//handle logout and destroy the session
router.post('*', verifyToken, function(req,res){
    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            console.log("Verified token, logging out")
            res.status(200).send({auth: true, status: "SUCCESS", message: "User has been logged out"});
        }
    })
});

module.exports = router;
