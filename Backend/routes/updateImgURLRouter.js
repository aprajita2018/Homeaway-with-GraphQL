var express = require('express');
var router = express.Router();

router.post('/api/updateImageURL', function(req, res){
    // console.log(req.body);
    //res.writeHead(200, "OK");
    res.end(JSON.stringify(req.body.url));
});

module.exports = router;
