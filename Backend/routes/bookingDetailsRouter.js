var express = require('express');
var router = express.Router();

//route to handle bookingDetails and fetch the booking related information for a 'traveler' type user
router.get('/bookingDetails', function(req, res){
    console.log("Inside booking details request for- ", req.session.user.id);
    var sql = "SELECT B.*, P.type, P.title, P.description, P.numSleep, P.numBath, P.numBed, P.city, P.streetAddress, P.state, P.photoURL " 
    + " FROM bookingdetails AS B" 
    + " JOIN propertydetails AS P ON (B.property_id = P.property_id)"
    + " WHERE booking_id = " + mysql.escape(req.query.id); 

    console.log(sql);

    pool.getConnection(function(err, con){
        if(err){
            res.writeHead(400, {
                'Content-type' : 'text/plain'
            })
            res.send("Could not connect to DB.");
        }
        else{
            pool.query(sql, function(err, result){
                if(err){
                    res.writeHead(400,{
                        'Content-type' : 'text/plain'
                    })
                    res.end("Error in fetching the requested booking & property details.");
                }
                else{
                    console.log("Successfuly fetched the booking & property details..");
                    res.send(result[0]);
                }

            })
        }
    })
});


module.exports = router;
