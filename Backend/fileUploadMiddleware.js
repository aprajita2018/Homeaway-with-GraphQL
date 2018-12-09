const axios = require('axios')
const cloudinary = require('cloudinary')

function fileUploadMiddleware(req, res) {
    for(var i=0; i < req.files.length; i++){
        cloudinary.uploader.upload_stream((result) => {
            console.log(`${req.headers.origin}/api/updateImageURL`)
            axios({
            url: `${req.headers.origin}/api/updateImageURL`, //API endpoint that needs file URL from CDN
            method: 'post',
            data: {
                url: result.secure_url,
                name: req.body.name,
                description: req.body.description,
            },
            }).then((response) => {
            // you can handle external API response here
            res.status(200).json({ success: true, fileUrl: result.secure_url })
            }).catch((error) => {
            console.log(error)
            res.status(500).json(error.response.data);
            });
        }).end(req.files[i].buffer);
    }
}

module.exports = fileUploadMiddleware