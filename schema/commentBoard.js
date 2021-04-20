const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentBoard = new Schema({
	boardId: { type: String, required: true },
	commentContents: { type: String, required: true },
	nickname: { type: String, required: true },
	userId: { type: String, required: true },
});


module.exports = mongoose.model('CommentBoard', commentBoard);
