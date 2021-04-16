const express = require('express');
const quest_commentRouter = express.Router();
const Quest_commentBoard = require("../schema/quest_commentBoard");
const authMiddleware = require("../middlewares/auth-middleware");


// 댓글리스트
quest_commentRouter.get('/:questId', async (req, res, next) => {
	const questId = req.params.questId;
	let result = { status: 'success', comments: [] };
	try {
		let comments = await Quest_commentBoard.find({ questId: questId }).sort({ date: -1 });
		for (comment of comments) {
			let temp = {
				quest_commentId: comment.quest_commentId,
				commentContents: comment.commentContents,
				nickname: comment.nickname,
                questId : questId,
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
quest_commentRouter.post('/:questId', authMiddleware, async (req, res, next) => {
    const user = res.locals.user;
    const {commentContents} = req.body;
    const {questId} = req.params;
    try {
		result = await Quest_commentBoard.create({
			questId : questId,
			commentContents: commentContents,
			nickname: user.nickname,
			userId: user.id,
		});
       
        res.json({ status : 'success', result }); 
	} catch (err) {
        
		res.json({ status : 'fail'})
	}
    
});


//댓글 삭제
quest_commentRouter.delete('/:quest_commentId', authMiddleware, async (req, res, next) => {
	let result = { status: 'success' };
	try {
		const user = res.locals.user;
		const quest_commentId = req.params.quest_commentId;
		const { deletedCount } = await Quest_commentBoard.deleteOne({ _id: quest_commentId, userId: user.id });
		if (!deletedCount) result['status'] = 'fail';
	} catch (err) {
		result['status'] = 'fail';
	}
	res.json(result);
});

module.exports = { quest_commentRouter };