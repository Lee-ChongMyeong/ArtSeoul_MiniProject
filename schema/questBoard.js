const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const questBoard = new Schema({
	userId: { type: String, required: true },
    nickname: { type: String, required: true },
	title: { type: String, required: true },
	contents: { type: String, required: true },
	date: { type: String, required: true, default : moment(new Date(Date.now())).format("YYYY-MM-DD HH:mm:ss") },

});

questBoard.virtual('questId').get(function () {	
	return this._id.toHexString();
});

questBoard.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model('QuestBoard', questBoard);
