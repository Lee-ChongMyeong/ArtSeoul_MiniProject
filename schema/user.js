const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

// 고정된 ref X

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
		default:"https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
	},
	
});

user.virtual('userId').get(function () {
	return this._id.toHexString();
});

user.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('User', user);
