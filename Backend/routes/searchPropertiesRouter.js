var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;


//handle searchBar and fetch the data matching the search query
router.get('*', verifyToken, function(req, res){
    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            console.log("Will search properties for the request: " + JSON.stringify(req.params))
            kafka.make_request(kafka_topics.SEARCHPROPERTIES,req.query, (err, properties) => {
                if(err) throw err;
                if(!properties){
                    console.log("~~~~Properties not found in search result~~~~");
                    res.send({auth: true, message:"Error fetching search results"});
                }
                else{
                    console.log("***Successfully fetched search properties, sending them.***" + JSON.stringify(properties));
                    res.status(200).send({auth: true, properties});
            }
            })
        }
    }); 
});


module.exports = router;
