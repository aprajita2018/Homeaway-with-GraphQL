var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');
var bcrypt = require('bcrypt');
const saltRounds = 12;

var db = mongoose.connection;

const config = require('../config/config');

//create a schema
var userschema = new Schema({
    user_id             :   {type:String},
    user_type           :   {type:String, required: true},
    f_name              :   {type:String, required: true },
    l_name              :   {type:String, required: true },
    email               :   {type:String, required: true },
    password            :   {type:String, required: true },
    gender              :   {type:String},
    phone_num           :   {type:String},
    hometown            :   {type:String},
    city                :   {type:String},
    state               :   {type:String},
    language            :   {type:String},
    aboutMe             :   {type:String},
    joined_date         :   {type:Date},
    photoURL            :   {type:String},
    bookings            :   [{type:String, ref: 'Booking'}],
    listings            :   [{type:String, ref: 'Property'}],
    messages            :   [{type:String, ref: 'Message'}]
});

//create a model 
var Users = mongoose.model('Users',userschema);

//export the model
module.exports = Users;

//define create user
module.exports.createUser = function(newUser){
    console.log("Inside model: user.js");
    var user_result;
    bcrypt.hash(newUser.password, saltRounds, function(err,hash){
        //Store Hash in your password DB
        if(err){
            console.log("ERROR: Failed to hash the password");
        }
        else{
            console.log("Inside Bcrypt function");
            newUser.password = hash;
            //newUser.save(callback);
            return Users.create(newUser, (err, user) => {
                if(err){
                    console.log("Error in creating user: " + err);
                    return {
                        status: "ERROR",
                        message: "Error creating user. All input fields are required"
                    }
                }
                else{
                    console.log("User created: " + user)
                    return {
                        status: "SUCCESS",
                        message: "Your account is created. Please log in to continue"
                    }
                }
            });
        }
    });
};

//define getUserbyEmail
module.exports.getUserByEmail = function(email, user_type, callback){
    const query = {email : email, user_type: user_type};
    console.log(query);
    Users.findOne(query, callback);
};

//define getUserbyEmail
module.exports.getUserById = function(id){
    const query = {_id : id};
    console.log(query);
    return Users.findOne(query);
};

//define compare password
module.exports.comparePassword = function(requestPassword, hash, callback){
    bcrypt.compare(requestPassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
};

//define updateProfile
module.exports.updateProfile = function(id, user, callback){
    console.log("The user Id: " + id + " and user details are: " + user + " .");
    Users.findByIdAndUpdate(id, user,callback);
};

//define fetchOwner
module.exports.fetchOwner = function(id, callback){
    const query = {_id: id};
    console.log("****Inside function: fetchOwner.****");
    Users.findOne(query, callback)
       
};
