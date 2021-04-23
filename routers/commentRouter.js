const express = require('express');
const commentRouter = express.Router();
const CommentBoard = require("../schema/commentBoard");
const authMiddleware = require("../middlewares/auth-middleware");
const jwt = require("jsonwebtoken");
const User = require('../schema/user');


// 댓글리스트
commentRouter.get('/:boardId', async (req, res, next) => {
	const boardId = req.params.boardId;
	let result = { status: 'success', comments: [] };
	// 스키마에서 user(key)값 가져와야함 , ref 말고
	try {
		const comments = await CommentBoard.find({ boardId: boardId }).populate({ path: "user", select: "nickname profile id" });
		// console.log(comments);
		// console.log(comments.user);

		for (comment of comments) {
			let temp = {
				commentId: comment.commentId,
				commentContents: comment.commentContents,
				userId: comment.user["id"],
				profile: comment.user["profile"],
				nickname: comment.user["nickname"]
			};
			result['comments'].push(temp);
		}
	} catch (err) {
		result['status'] = 'fail';
		// res.send({mss:"오류"});
	}
	res.json(result);
});

// commentRouter.get('/:boardId', async (req, res, next) => {
// 	const boardId = req.params.boardId;
// 	let result = { status: 'success', comments: [] };
// 	try {
// 	   let comments;
// 	   comments = await CommentBoard.find({ boardId: boardId }).populate({ path: "User" }).sort({ date: -1 });

// 	   for (comment of comments) {
// 	   const profileData = await User.findOne({id : comment["userId"]});
// 	   let temp = {
// 		  commentId: comment.commentId,
// 		  commentContents: comment.commentContents,
// 		  nickname: comment.nickname,
// 		  boardId : boardId,
// 		  userId: comment.userId,
// 		  profile : profileData["profile"]
// 	   };
// 	   result['comments'].push(temp);
// 	 }
//    } catch (err) {
// 	 result['status'] = 'fail';
//    }
//    res.json(result);
//  });

// 댓글추가
commentRouter.post('/:boardId', authMiddleware, async (req, res, next) => {
	try {
		const user = res.locals.user;
		userprofile = user["profile"];
		const result = await CommentBoard.create({
			boardId: req.params.boardId,
			commentContents: req.body.commentContents,
			user: user["_id"]
		});
		res.json({ status: 'success', result: result, currentprofile: userprofile });
	} catch (err) {
		res.json({ status: 'fail' });
	}
});


// 댓글 삭제
commentRouter.delete('/:commentId', authMiddleware, async (req, res, next) => {
	let result = { status: 'success' };
	try {
		const user = res.locals.user;
		const commentId = req.params.commentId;
		const { deletedCount } = await CommentBoard.deleteOne({ _id: commentId, userId: user.id });
		if (!deletedCount) result['status'] = 'fail';
	} catch (err) {
		result['status'] = 'fail';
	}
	res.json(result);
});

module.exports = { commentRouter };