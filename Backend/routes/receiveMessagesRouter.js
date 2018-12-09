var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;


//route to handle listingProperty and insert the property details into the propertydetails table 
router.get('*',verifyToken, function(req, res){

    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            var id = token_payload._id;    
            kafka.make_request(kafka_topics.RECEIVEMSG, id, (err, userMessages) => {
                console.log('Inside Receive Messages function in router.');
                if(err) throw err;
                if(!userMessages){
                    console.log("Unable to retrieve messages. :( ");
                    res.send({auth: false, status: "ERROR", message:" Unable to retrieve message. :( "});
                }
                res.status(200).send({auth: true, status: "SUCCESS", message:"Successfully retrieved messages.", userMessages});
                })
            }
    }); 
});


module.exports = router;
