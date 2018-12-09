var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var cors = require('cors');

var {mongoose} = require('./db/mongoose');

//config for multer
const cloudinary = require('cloudinary');
                           
//config for passport & jwt
var passport = require('passport');
//Passport middleware initialization
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);


//config for cloudinary account
cloudinary.config({
    cloud_name: 'sjsu-aprajita',
    api_key: '498929163855749',
    api_secret: 'HgpUivWS6WF2Az5Z4ZJgqbOGFos',
  });

//use cors for cross origin resourse sharing
app.use(cors({origin: '*', credentials: true}));
//app.use(cors({origin: 'http://ec2-13-56-229-63.us-west-1.compute.amazonaws.com:3000', credentials: true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use express-session to maintain session data
app.use(session({
    secret              : 'cmpe273_react_express',
    resave              : false, // Forces the session to be saved back to the session , even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  20 * 60 * 1000
}));

//allow access control
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//import the routes
var loginRouter             = require('./routes/loginRouter');
var signupRouter            = require('./routes/signupRouter');
var userDetailsRouter       = require('./routes/userDetailsRouter');
var updateProfileRouter     = require('./routes/updateProfileRouter');
var logout                  = require('./routes/logout');
var ownerDetailsRouter      = require('./routes/ownerDetailsRouter');
var ownerPropertiesRouter   = require('./routes/ownerPropertiesRouter');
var listingPropertyRouter   = require('./routes/listingPropertyRouter');
var searchPropertiesRouter  = require('./routes/searchPropertiesRouter');
var propertyDetailsRouter   = require('./routes/propertyDetailsRouter');
var bookNowRouter           = require('./routes/bookNowRouter');
var bookingDetailsRouter    = require('./routes/bookingDetailsRouter');
var bookedTripsRouter       = require('./routes/bookedTripsRouter');
var uploadFilesRouter       = require('./routes/uploadFilesRouter');
var updateImgURLRouter      = require('./routes/updateImgURLRouter');
var sendMessageRouter       = require('./routes/sendMessageRouter');
var receiveMessagesRouter   = require('./routes/receiveMessagesRouter');
var userDetailsByIDRouter     = require('./routes/userDetailsByIDRouter');

//routing to different routes
app.use('/login', loginRouter);
app.use('/userSignup', signupRouter);
app.use('/userDetails', userDetailsRouter);
app.use('/updateProfile', updateProfileRouter);
app.use('/logout', logout);
app.use('/ownerDetails', ownerDetailsRouter);
app.use('/ownerProperties', ownerPropertiesRouter);
app.use('/listingProperty',listingPropertyRouter);
app.use('/searchProperties', searchPropertiesRouter);
app.use('/propertyDetails', propertyDetailsRouter);
app.use('/bookNow', bookNowRouter);
app.use('/bookingDetails', bookingDetailsRouter);
app.use('/bookedTrips', bookedTripsRouter);
app.use('/uploadFiles', uploadFilesRouter);
app.use('/api/updateImageURL', updateImgURLRouter);
app.use('/sendMessage', sendMessageRouter);
app.use('/receiveMessages', receiveMessagesRouter);
app.use('/userDetailsByID',userDetailsByIDRouter);

//start the server on port 3001
app.listen(3001);
console.log("Server listening on port # 3001");
