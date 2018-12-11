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
module.exports.fetchProperties = function(values){
    const query = {owner_id: values.owner_id}
    console.log("****Inside function : fetchProperties.**** for owner " + values.owner_id);    
    return Properties.find(query);
};

//define fetch property with all the details
module.exports.fetchProperty = function(id){
    const query = {_id: id};
    console.log("****Inside function: fetchProperty.****");
    return Properties.findOne(query);
};


//define fetch property with all the details
module.exports.searchProperties = function(values){
    const query = {
        city: values.city,
        fromDate: {$lte: values.fromDate},
        toDate: {$gte: values.toDate},
        numSleep: {$gte: values.numSleep}
    };
    console.log("****Inside function: searchProperties.****" + JSON.stringify(query));
    return Properties.find(query, (err, properties)=> {
        console.log(properties);
    });   
};

//define fetch property by IDs with all the details
module.exports.fetchPropertiesByIDs = function(values){
    const query = {
        _id: {$in: values.ids}
    };
    console.log("****Inside function: fetchPropertyDetailsByIDs.****" + JSON.stringify(query));
    return Properties.find(query, (err, properties)=> {
        console.log(properties);
    });   
};

