var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

const config = require('../config/config');

//create a schema
var bookingSchema = new Schema({
    user_id        :    {type:String},
    property_id    :    {type:String, required: true },
    owner_id       :    {type:String, required: true },
    pricePerNight  :    {type:String, required: true },
    fromDate       :    {type:Date},
    toDate         :    {type:Date},
    priceTotal     :    {type:String},    
});

//create a model 
var Bookings = mongoose.model('Booking',bookingSchema);

//export the model
module.exports = Bookings;

//define create booking
module.exports.createBooking = function(newBooking, callback){
    console.log("****Inside function createBooking.****");
    Bookings.create(newBooking,callback);
};

//define fetch traveller bookings
module.exports.fetchTravellerBookings =  function(values){
    const query = {
        user_id: values.user_id
    };
    console.log("****Inside function fetchTravellerBookings.*****");
    return Bookings.find(query);
}

//define fetch owner bookings
module.exports.fetchOwnerBookings =  function(values){
    const query = {
        owner_id: values.owner_id
    };
    console.log("****Inside function fetchOwnerBookings.*****");
    return Bookings.find(query);
}

//define fetch property bookings
module.exports.fetchPropertyBookings =  function(values){
    const query = {
        property_id: values.property_id
    };
    console.log("****Inside function fetchPropertyBookings.*****");
    return Bookings.find(query);
}


