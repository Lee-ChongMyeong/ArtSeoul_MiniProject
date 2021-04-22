const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
	id: { 
		type: String, 
		required: true, 
		unique: true 
	},
	email: {
        type: String,
		required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
	password: { 
		type: String, 
		required: true 
	},
	nickname: { 
		type: String, 
		required: true, 
		unique: true 
	},
	profile:{
		type:String, 
		required: true, 
		default:"https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"
	},
	
});

user.virtual('userId').get(function () {
	return this._id.toHexString();
});

user.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('User', user);
