const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const HomeBoard = require('../schema/homeBoard');
const authMiddleware = require("../middlewares/auth-middleware");


//게시글 목록
router.get('/', async (req, res) => {
	let result = { status: 'success', boardsData: [] };
	try {
		let boardsData = await HomeBoard.find().sort({ date: -1 });
		for (homeBoard of boardsData) {
			let temp = {
                boardId : homeBoard["_id"],
                title : homeBoard["title"],
                contents : homeBoard["contents"],
                nickname : homeBoard["nickname"],
                date : homeBoard["date"],
                images : homeBoard["images"]
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
router.post('/',  async (req, res) => {
	let result = { status: 'success' };
	try {
		await HomeBoard.create({
			title: req.body['title'],
			contents: req.body['contents'],
			nickname: "총명이", // 가상의 닉네임
			date: Date.now(),
			images: req.body['images']
		});
	} catch (err) {
		result['status'] = 'fail';
	}
	res.json(result);
});



// 게시글 수정
router.put("/:boardId", async (req, res) => {
    let result = { status: "success" };
    try {
        const boardId = req.params.boardId;
      if (req.body["images"]) {
        const { n } = await HomeBoard.updateOne(
          // n은 조회된 데이터 갯수
          { _id: boardId },
          { title : req.body.title, contents: req.body.contents, images: req.body.images }
        );
        if (!n) {
          result["status"] = "fail";
        }
      } else {
        const { n } = await HomeBoard.updateOne(
          { _id: boardId },
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
router.delete("/:boardId", async (req, res) => {
    let result = { status: "success" };
    try {
      const boardId = req.params.boardId;
      const { deletedCount } = await HomeBoard.deleteOne({
        _id: boardId,
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

module.exports = router;