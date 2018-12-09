var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;



//handle the ownerDetails and fetch the owner details from the user table
router.get('*',verifyToken, function(req, res){

    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            var id = req.query.id;
            kafka.make_request(kafka_topics.USERDETAILSBYID, id, (err, user) => {
                if(err) throw err;
                if(!user){
                    console.log("~~~~User not found while searching by id~~~~");
                    res.send({auth: false, message:"User not found in search by id"});
                }
                else{
                    console.log("***Successfully fetched user details by id, sending them.***");
                    res.status(200).send({auth: true, status: "SUCCESS", user});
                }
                
            });
        } 
    });
});



module.exports = router;
