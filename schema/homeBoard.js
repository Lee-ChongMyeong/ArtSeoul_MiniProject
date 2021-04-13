const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeBoard = new Schema({
	markerId: {type: String, required: true},
	userId: { type: String, required: true },
	title: { type: String, required: true },
	contents: { type: String, required: true },
	nickname: { type: String, required: true },
	date: { type: Date, required: true, default: Date.now() },
	img: { type: String, default: "https://vrthumb.clipartkorea.co.kr/2018/08/06/ti367a12202.jpg" }
});

homeBoard.virtual('boardId').get(function () {
	return this._id.toHexString();
});

homeBoard.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('HomeBoard', homeBoard);
