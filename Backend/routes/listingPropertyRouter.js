var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;
var Property = require('../models/property');


//route to handle listingProperty and insert the property details into the propertydetails table 
router.post('*',verifyToken, function(req, res){

    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            const id = token_payload._id;
            var params = req.body;
            property = {
                type        :   params.type,
                title       :   params.title,
                description :   params.description,
                owner_id    :   id,
                numSleep    :   params.numSleep,
                numBath     :   params.numBath,
                numBed      :   params.numBed,
                minStay     :   params.minStay,
                city        :   params.city,
                streetAddress:  params.streetAddress,
                state       :   params.state,
                price       :   params.price,
                fromDate    :   params.fromDate,
                toDate      :   params.toDate,
                photoURL    :   params.photoURL
            }
            console.log("Request received to create/list the property with details: " + JSON.stringify(property));
    
            Property.listProperty(property, (err, result) => {
            console.log('Inside List Property function in router & inside kafka.make_request.');
            if(err){
                console.log("ERROR: " + err);
                throw err;
            } 
            if(!result){
                console.log("Unable to list property. :( ");
                res.send({auth: false, status: "ERROR", message:" Unable to list property. :( "});
            }
            else{
                res.status(200).send({auth: true, status: "SUCCESS", message:"Successfully created the property listing."});
            }
            })
        }
    }); 
});


module.exports = router;
