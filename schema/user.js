const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
	id: { 
		type: String, 
		required: true, 
		unique: true 
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
		default:"http://upload3.inven.co.kr/upload/2020/05/28/bbs/i13842534729.jpg"
	}
});

user.virtual('userId').get(function () {
	return this._id.toHexString();
});

user.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('User', user);
