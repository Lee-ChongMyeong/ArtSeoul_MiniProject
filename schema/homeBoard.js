const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeBoard = new Schema({
	// user:{
	// 	type: Types.ObjectId,
	// 	required: true,
	// 	ref: "User",
	// },
	// markerId:{
	// 	type: Types.ObjectId,
	// 	required: true,
	// 	ref: "Marker",
	// },
	
	title:{
		type: String,
		requried: true,
	},
    contents:{
		type: String,
		requried: true,
	},
	nickname:{
		type: String,
		requried: true,
	},
	img:{
		type: Array,
		default: []
	},
	date:{
		type: String,
		required: true,
		default: Date.now()
	},
	
});
homeBoard.virtual('boardId').get(function () {
	return this._id.toHexString();
});


module.exports = mongoose.model('HomeBoard', homeBoard);
