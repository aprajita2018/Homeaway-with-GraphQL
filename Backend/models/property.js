var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

const config = require('../config/config');

//create a schema
var propertySchema = new Schema({
    property_id     :   {type:String},
    type            :   {type:String},
    title           :   {type:String, required: true },
    description     :   {type:String, required: true },
    owner_id        :   {type:String, required: true },
    numSleep        :   {type:String, required: true },
    numBath         :   {type:String, required: true},
    numBed          :   {type:String},
    minStay         :   {type:String},
    city            :   {type:String},
    state           :   {type:String},
    streetAddress   :   {type:String},
    price           :   {type:String},
    fromDate        :   {type:Date},
    toDate          :   {type:Date},
    photoURL        :   {type:String},
    bookings        :   [{type:String, ref: 'Booking'}],
    ownerDetails    :   [{type:String, ref: 'User'}] 
});

//create a model 
var Properties = mongoose.model('Property',propertySchema);

//export the model
module.exports = Properties;

//define list property
module.exports.listProperty = function(newProperty, callback){

    console.log("Inside model: property.js");
    //var propertyObj = new propertyObj(newProperty);
    Properties.create(newProperty, callback);
};

//define fetch properties
module.exports.fetchProperties = function(id, callback){
    const query = {owner_id: id}
    console.log("****Inside function : fetchProperties.****");    
    Properties.find(query, callback);
};

//define fetch property with all the details
module.exports.fetchProperty = function(id, callback){
    const query = {_id: id};
    console.log("****Inside function: fetchProperty.****");
    Properties.findOne(query, callback)
    // .populate(User)
    // .exec(function(err, result){
    //     if(err){
    //         console.log("ERROR: " + err);
    //         throw err;
    //     }
    //     console.log("Property Details: " + JSON.stringify(result));
    //     callback(err, result);
    // });    
};


//define fetch property with all the details
module.exports.searchProperties = function(values, callback){
    const query = {
        city: values.city,
        fromDate: {$lt: values.fromDate},
        toDate: {$gt: values.toDate},
        numSleep: {$gt: values.numSleep}
    };
    console.log("****Inside function: searchProperties.****");
    Properties.find(query, callback)   
};

