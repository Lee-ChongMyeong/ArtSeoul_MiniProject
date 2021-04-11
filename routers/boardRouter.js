const express = require('express');
const boardRouter = express.Router();
const jwt = require("jsonwebtoken");
const HomeBoard = require('../schema/homeBoard');
const authMiddleware = require("../middlewares/auth-middleware");

//게시글 목록
boardRouter.get('/', authMiddleware, async (req, res) => {
	let result = { status: 'success', boardsData: [] };
	try {
    const user = res.locals.user;
		let boardsData = await HomeBoard.find().sort({ date: -1 });
		for (homeBoard of boardsData) {
			let temp = {
                boardId : homeBoard["_id"],
                title : homeBoard["title"],
                contents : homeBoard["contents"],
                nickname : homeBoard["nickname"],
                date : homeBoard["date"],
                img : homeBoard["img"]
			};
			result['boardsData'].push(temp);
		}
	} catch (err) {
		console.log(err);
		result['status'] = 'fail';
	}
	res.json(result);
});

// 게시글 추가 
boardRouter.post('/', authMiddleware, async (req, res) => {
	let result = { status: 'success' };
	try {
    const user = res.locals.user;
    await HomeBoard.create({
			title: req.body['title'],
			contents: req.body['contents'],
			nickname: user.nickname,
      userId : user.id,
			date: Date.now(),
			img: req.body['img']
		});
	} catch (err) {
		result['status'] = 'fail';
	}
	res.json(result);
});


// 게시글 수정
boardRouter.put("/:boardId", authMiddleware, async (req, res) => {
    let result = { status: "success" };
    try {
      const user = res.locals.user;
      const boardId = req.params.boardId;
      if (req.body["img"]) {
        const { n } = await HomeBoard.updateOne(
          // n은 조회된 데이터 갯수
          { _id: boardId, userId : user.id },
          { title : req.body.title, contents: req.body.contents, img: req.body.img }
        );
        if (!n) {
          result["status"] = "fail";
        }
      } else {
        const { n } = await HomeBoard.updateOne(
          { _id: boardId, userId: user.id },
          { title : req.body.title, contents: req.body.contents }
        );
        if (!n) {
          result["status"] = "fail";
        }
      }
    } catch (err) {
      result["status"] = "fail";
    }
    res.json(result);
  });

// 게시글 삭제
boardRouter.delete("/:boardId", authMiddleware, async (req, res) => {
    let result = { status: "success" };
    try {
      const user = res.locals.user;
      const boardId = req.params.boardId;
      const { deletedCount } = await HomeBoard.deleteOne({
        _id: boardId,
        userId : user.id,
      });
      if (deletedCount) {
        await HomeBoard.deleteMany({ boardId: boardId });
      } else {  
        result["status"] = "fail";
      }
    } catch (err) {
      result["status"] = "fail";
    }
    res.json(result);
  });

  module.exports = { boardRouter };
