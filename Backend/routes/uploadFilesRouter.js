var express = require('express');
var router = express.Router();

//config for multer
const multer = require('multer');
const cloudinary = require('cloudinary');

//config for cloudinary account
cloudinary.config({
    cloud_name: 'sjsu-aprajita',
    api_key: '498929163855749',
    api_secret: 'HgpUivWS6WF2Az5Z4ZJgqbOGFos',
  });

//Configure Multer upload
const upload = multer({ 
    storage: multer.memoryStorage(), 
    limits: {fileSize: 5 * 1024 * 1024},
    }).single('images');

//route to handle uploadFiles and return the uploaded url
router.post('*', function(req, res){
    upload(req, res, function(err){
        console.log("Processing file: " + req.file.originalname);
        if(err) {
            return res.end("Error uploading file.");
        }
        cloudinary.uploader.upload_stream((result) => {
            console.log("Received URL: " + result.secure_url);
            res.status(200).json({ success: true, fileUrl: result.secure_url});
        }).end(req.file.buffer);
    });
});



module.exports = router;
