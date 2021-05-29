const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const quest_commentBoard = new Schema({
	questId: { type: String, required: true },
	commentContents: { type: String, required: true },
	nickname: { type: String, required: true },
	userId: { type: String, required: true },
});

quest_commentBoard.virtual('quest_commentId').get(function () {
	return this._id.toHexString();
});

quest_commentBoard.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('Quest_commentBoard', quest_commentBoard);
