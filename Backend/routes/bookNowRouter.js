var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var Bookings = require('../models/booking');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;


//route to handle bookNow & to insert into bookingdetails table
router.post('*', verifyToken, function(req, res){
    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            const id = token_payload._id;
            var params = req.body;
            booking = {
                user_id        :    id,
                property_id    :    params.property_id,
                owner_id       :    params.owner_id,
                pricePerNight  :    params.pricePerNight,
                fromDate       :    params.fromDate,
                toDate         :    params.toDate,
                priceTotal     :    params.priceTotal
            }
            console.log("Request received to create the booking with details: " + JSON.stringify(booking));
    
        Bookings.createBooking(booking, (err, booking) => {
            console.log('Inside Book Property function in router.');
            if(err) throw err;
            if(!booking){
                console.log("Unable to book property. :( ");
                res.send({auth: false, status: "ERROR", message:" Unable to book property. :( "});
            }
            else{
                console.log(JSON.stringify(booking));
                res.status(200).send({auth: true, status: "SUCCESS", message:"Successfully booked the property.", booking});
            }
            })
        }
    }); 
})


module.exports = router;
