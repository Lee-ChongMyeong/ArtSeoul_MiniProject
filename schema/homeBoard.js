const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeBoard = new Schema({
	// user:{
	// 	type: Types.ObjectId,
	// 	required: true,
	// 	ref: "User",
	// },

	markerId: {
		type: String,
		required: true
	},
	userId: { type: String, required: true },
	title: { type: String, required: true },
	contents: { type: String, required: true },
	nickname: { type: String, required: true },
	date: { type: Date, required: true, default: Date.now() },
	img: { type: Array, default: ["https://vrthumb.clipartkorea.co.kr/2018/08/06/ti367a12202.jpg"] }
});

module.exports = mongoose.model('HomeBoard', homeBoard);
