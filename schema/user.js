const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
	id: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	nickname: { type: String, required: true, unique: true },
});

user.virtual('userId').get(function () {
	return this._id.toHexString();
});

user.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('User', user);
