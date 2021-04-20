const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

// 닉네임 , 유저아이디 , 프로필사진

const commentBoard = new Schema({
   boardId: {type: String, required: true 
   },
   commentContents: { type: String, required: true },
   user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
   }
});


module.exports = mongoose.model('CommentBoard', commentBoard);