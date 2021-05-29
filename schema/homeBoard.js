// 게시글 스키마
const mongoose = require('mongoose');
const { Schema, model, Types  } = mongoose;
const moment = require('moment');

// 내려줘야하는 유저정보가 닉네임, 유저아이디 프로필이미지라서 그냥 이것도 populate쓰기로함
const homeBoard = new Schema({
   markerId: { type: String, required: true },
   markername: { type: String, required: true },
   user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
   },
   title: { type: String, required: true },
   contents: { type: String, required: true },
   date: { type: String, required: true, default: moment(new Date(Date.now())).format("YYYY-MM-DD HH:mm:ss") },
   img: { type: String, default: "https://vrthumb.clipartkorea.co.kr/2018/08/06/ti367a12202.jpg" },
});

homeBoard.virtual('boardId').get(function () {
   return this._id.toHexString();
});

homeBoard.set('toJSON', {
   virtuals: true
});

module.exports = mongoose.model('HomeBoard', homeBoard);
