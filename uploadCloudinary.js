////////////////////////////////
// Upload files to Cloudinary //
////////////////////////////////
const multer = require('multer')
const stream = require('stream')
const cloudinary = require('cloudinary')

// to do
//if (!process.env.CLOUDINARY_URL) {
//    process.env.CLOUDINARY_URL = "cloudinary://736967426242398:tEa7Yn8Kiz-u07cOvsK9owsfYnQ@diep6p0fn";
//}

cloudinary.config({
	cloud_name: 'diep6p0fn',
	api_key: '736967426242398',
	api_secret: 'tEa7Yn8Kiz-u07cOvsK9owsfYnQ'
});

const doUpload = (publicId, req, res, next) => {

	const uploadStream = cloudinary.uploader.upload_stream(result => {    	
         // capture the url and public_id and add to the request
         req.fileurl = result.url
         req.fileid = result.public_id
         next()
	}, { public_id: req.body[publicId]})

	// multer can save the file locally if we want
	// instead of saving locally, we keep the file in memory
	// multer provides req.file and within that is the byte buffer

	// we create a passthrough stream to pipe the buffer
	// to the uploadStream function for cloudinary.
	const s = new stream.PassThrough()
	s.end(req.file.buffer)
	s.pipe(uploadStream)
	s.on('end', uploadStream.end)
	// and the end of the buffer we tell cloudinary to end the upload.
}

// multer parses multipart form data.  Here we tell
// it to expect a single file upload named 'image'
// Read this function carefully so you understand
// what it is doing!
/*
const uploadImage = (publicId) => (req, res, next) => {
	console.log(req);
	if (req.body.image) 
		multer().single('image')(req, res, () => 
						doUpload(publicId, req, res, next));
	else 
		next();
}
*/

const uploadImage = (publicName) => (req, res, next) =>
	 multer().single('image')(req, res, () => {
		if (req.file)
			 doUpload(publicName, req, res, next)
		else
			next();
	 })
	 
               

// 
// then to use in profile.js do (see comment in getImage about the string 'avatar')
//     const uploadImage = require('./uploadCloudinary')
//     app.put('/avatar', uploadImage('avatar'), uploadAvatar)
//

module.exports = uploadImage