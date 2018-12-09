var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;
var express = require('express');
var router = express.Router();
//var Property = require('../models/property');
var jwt = require('jsonwebtoken'); 
var config = require('../config/config');
var verifyToken = require('../middleware/verifyToken');

//handle the propertyDetails and fetch all the propety data from propertydetails
router.get('*', verifyToken, function(req, res){
    console.log("Request received for property ID: ", req.query.id);

    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            console.log(req.query.id);
            kafka.make_request(kafka_topics.FETCHPROPERTY, req.query.id, (err, property) => {
                if(err) throw err;
                if(!property){
                    console.log("~~~~Property not found~~~~");
                    res.send({auth: false, message:"Property not found"});
                }
                else{
                    console.log("***Successfully fetched property, sending them.***");
                    console.log(property);
                    res.status(200).send({auth: true, status: "SUCCESS", property});
                }
            });            
        }
    }); 
});

module.exports = router;
