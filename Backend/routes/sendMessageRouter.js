var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;


//route to handle listingProperty and insert the property details into the propertydetails table 
router.post('*',verifyToken, function(req, res){

    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            const sender_id = token_payload._id;
            var params = req.body;
            message = {
                propertyID  :   params.property_id,
                recipientID :   params.to,
                senderID    :   sender_id,
                timestamp   :   new Date().toISOString(),
                msgBody     :   params.msg,
                propertyTitle:  params.property_title
            }
            console.log("Request received to send the message with details: " + JSON.stringify(message));
    
        kafka.make_request(kafka_topics.SENDMSG, message, (err, message) => {
            console.log('Inside Send Message function in router.');
            if(err) throw err;
            if(!message){
                console.log("Unable to send message. :( ");
                res.send({auth: false, status: "ERROR", message:" Unable to send message. :( "});
            }
            else {   
                console.log(message);
                res.status(200).send({auth: true, status: "SUCCESS", message:"Successfully sent the message.", msg: message});
            }
            })
        }
    }); 
});


module.exports = router;
