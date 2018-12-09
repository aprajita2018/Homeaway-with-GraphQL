var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;


//route handle the bookedTrips and fetch the booking_id (for a booked trip) for a user
router.get('*', verifyToken, function(req, res){
    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            kafka.make_request(kafka_topics.FETCHBOOKINGS,token_payload._id, (err, bookings) => {
                if(err) throw err;
                if(!bookings){
                    console.log("~~~~Bookings not found~~~~");
                    res.send({auth: false, message:"Properties not found", bookings});
                }
                else{
                    console.log("***Successfully fetched bookings, sending them.***");
                    res.status(200).send({auth: true, bookings});
                }
            })
        }
    }); 
    
});


module.exports = router;
