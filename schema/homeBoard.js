const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const homeBoard = new Schema({
	markerId: {type: String, required: true},
	markername: {type: String, required: true},
	userId: { type: String, required: true },
	title: { type: String, required: true },
	contents: { type: String, required: true },
	nickname: { type: String, required: true },
	date: { type: String, required: true, default : moment(new Date(Date.now())).format("YYYY-MM-DD HH:mm:ss") },
	img: { type: String, default: "https://vrthumb.clipartkorea.co.kr/2018/08/06/ti367a12202.jpg" }
});

homeBoard.virtual('boardId').get(function () {	
	return this._id.toHexString();
});

homeBoard.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('HomeBoard', homeBoard);
