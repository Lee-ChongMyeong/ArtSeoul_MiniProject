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
   try {
      const comments = await CommentBoard.find({ boardId: boardId }).populate({path:"user",select:"nickname profile id"});

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
   }
   res.json(result);
});

// 댓글추가
commentRouter.post('/:boardId', authMiddleware, async (req, res, next) => {
   try {
      const user = res.locals.user;
      userprofile = user["profile"];
      const result = await CommentBoard.create({
         boardId: req.params.boardId,
         commentContents: req.body.commentContents,
         nickname: user.nickname,
			userId: user.id,
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