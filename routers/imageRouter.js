const express = require('express');
const imageRouter = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/');
	},
	filename: function (req, file, cb) {
		let ex = file.originalname.split('.');
		console.log(ex)
		cb(null, 'img' + Date.now() + parseInt(Math.random() * (99 - 10) + 10) + '.' + ex[ex.length - 1]);
	}
});

function fileFilter(req, file, cb) {
	const fileType = file.mimetype.split('/')[0] == 'image';
	if (fileType) cb(null, true);
	else cb(null, false);
}

const upload = multer({
	storage: storage,
	fileFilter: fileFilter
});

imageRouter.post('/', upload.array('images'), authMiddleware, async (req, res) => {
	result = { status: 'success', images: [] };
	try {
		if (req.files) {
			for (value of req.files) {	
				result['images'].push('http://13.125.250.74:9090/' + value.filename);
				console.log(value);
			}
			
		}
	} catch (err) {
		result['status'] = 'fail';
	}
	res.json(result);
});

module.exports = { imageRouter };
