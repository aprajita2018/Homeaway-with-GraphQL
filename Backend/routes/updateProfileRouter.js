var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var kafka = require('../Kafka/client');
var kafka_topics = require('../config/KafkaTopics').kafka_topic_enums;


//route to handle updateProfile and insert the updated user info into the user table
router.post('*',verifyToken, function(req,res){

    jwt.verify(req.token, config.secret, (err, token_payload) => {
        if(err){
            console.log(err);
            res.status(403).send({auth: false, message: "Invalid token found"});
        }
        else{
            const id = token_payload._id;
            var params = req.body;
            user = {
                f_name:params.fname,
                l_name: params.lname,
                gender: params.gender,
                phone_num: params.phone,
                hometown: params.hometown,
                city: params.city,
                state: params.state,
                languages: params.languages,
                aboutMe: params.aboutMe,
                photoURL: params.photoURL
            }
            console.log(user);
            var request_data = {id, user};

            kafka.make_request(kafka_topics.UPDATEUSERDETAILS, request_data, function(err, user){
                if(err) throw err;
                if(!user){
                    console.log("User not found");
                    res.send({auth: false, status: "ERROR", message:"User not found"});
                }
                res.status(200).send({auth: true, status: "SUCCESS", user});
            })
        }
    }); 
})


module.exports = router;
