// 게시글 스키마
const mongoose = require('mongoose');
const { Schema } = mongoose;
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

///
commentRouter.get('/:boardId', async (req, res, next) => {
    const boardId = req.params.boardId;
    let result = { status: 'success', comments: [] };
    try {
        let comments = await CommentBoard.find({ boardId: boardId }).sort({ date: -1 });

        //
        for (comment of comments) {
            console.log(comment)
            const profileData = await User.findOne({ id: comment["userId"] })
            console.log(profileData)
            let temp = {
                commentId: comment.commentId,
                commentContents: comment.commentContents,
                nickname: comment.nickname,
                boardId: boardId,
                userId: comment.userId

            };
            result['comments'].push(temp);
        }
    } catch (err) {
        result['status'] = 'fail';
    }
    res.json(result);
});

////


commentRouter.get('/:boardId', async (req, res, next) => {
    const boardId = req.params.boardId;
    let result = { status: 'success', comments: [] };
    try {
        let comments = await CommentBoard.find({ boardId: boardId }).sort({ date: -1 });

        //
        for (comment of comments) {
            console.log(comment)
            let temp = {
                commentId: comment.commentId,
                commentContents: comment.commentContents,
                nickname: comment.nickname,
                boardId: boardId,
                userId: comment.userId

            };
            result['comments'].push(temp);
        }
    } catch (err) {
        result['status'] = 'fail';
    }
    res.json(result);
});