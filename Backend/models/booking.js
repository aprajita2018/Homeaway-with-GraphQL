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

//define fetch booking
module.exports.fetchBookings =  function(id, callback){
    const query = {user_id: id};
    console.log("****Inside function fetchBookings.*****");
    Bookings.find(query, callback);
}


