var express = require('express');
var router = express.Router();
//var Property = require('../models/property');
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;


//route to handle ownerProperties and fetch property_id from propertydetails 
router.get('*',verifyToken, function(req, res){
    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            kafka.make_request(kafka_topics.FETCHPROPERTIES, token_payload._id, (err, properties) => {
                if(err) throw err;
                if(!properties){
                    console.log("~~~~Properties not found~~~~");
                    res.send({auth: false, message:"Properties not found"});
                }
                console.log("***Successfully fetched properties, sending them.***");
                res.status(200).send({auth: true, properties});
            })
        }
    }); 
});


module.exports = router;
