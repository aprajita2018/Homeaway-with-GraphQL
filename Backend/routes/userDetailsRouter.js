var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;

//handle the userDetails and fetch all the details for a user
router.get('*', verifyToken, function(req, res){
    console.log("Will try to verify token: " + req.token + " using secret " + config.secret);
    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            console.log('Inside userDetails route. Going to kafka.make_request now.');
            var request_data = {email: token_payload.email, user_type: token_payload.user_type}
            
            kafka.make_request(kafka_topics.USERDETAILS, request_data, function(err, user){
                if(err) throw err;
                if(!user){
                    console.log("User not found");
                    res.send({auth: false, message:"User not found"});
                }
                res.status(200).send({auth: true, status: "SUCCESS", user}); 
            })
        }
    });    
});

module.exports = router;
