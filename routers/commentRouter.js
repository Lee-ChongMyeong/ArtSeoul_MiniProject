const express = require('express');
const commentRouter = express.Router();
const CommentBoard = require("../schema/commentBoard");
const authMiddleware = require("../middlewares/auth-middleware");
const jwt = require("jsonwebtoken");


// 댓글리스트
commentRouter.get('/:boardId', async (req, res, next) => {
	const boardId = req.params.boardId;
	let result = { status: 'success', comments: [] };
	try {
		let comments = await CommentBoard.find({ boardId: boardId }).sort({ date: -1 });
		for (comment of comments) {
			let temp = {
				commentId: comment.commentId,
				commentContents: comment.commentContents,
				nickname: comment.nickname,
                boardId : boardId,
				userId: comment.userId,
			};
			result['comments'].push(temp);
		}
	} catch (err) {
		result['status'] = 'fail';
	}
	res.json(result);
});


// 댓글추가
commentRouter.post('/:boardId', authMiddleware, async (req, res, next) => {
	try {
		const user = res.locals.user;
		const result = await CommentBoard.create({
			boardId: req.params.boardId,
			commentContents: req.body.commentContents,
			nickname: user.nickname,
			userId: user.id,
		});
        console.log(result)
        res.json({ status : 'success', result }); 
	} catch (err) {
		result['status'] = 'fail';
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