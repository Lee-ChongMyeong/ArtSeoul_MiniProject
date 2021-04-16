const express = require('express');
const settingRouter = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const QuestBoard = require('../schema/questBoard');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


// 환경설정
settingRouter.get("/", authMiddleware, async (req, res) => {
	try {
		res.send({ mss: "환경설정 테스트중 " })
	} catch (error) {
		res.send({ mss: " 환경설정 테스트 실패" })
	}
});

// 프로필 수정


// Q&A 목록
settingRouter.get("/quest", async (req, res) => {
	try {
		const settingboard = await QuestBoard.find({});
		res.json({ result: "success", settingboard: settingboard });
	} catch (error) {
		res.send({ mss: " " })
	}
});

// Q&A 추가
settingRouter.post('/quest', authMiddleware, async (req, res) => {

	const user = res.locals.user;
	try {
		const result = await QuestBoard.create({
			userId: user.id,
			title: req.body['title'],
			date: moment().format("YYYY-MM-DD HH:mm:ss"),
			contents: req.body['contents'],
			nickname: user.nickname,
		});
		res.json({ status: "success", result: result })
	} catch (err) {
		result['status'] = 'fail';
	}
});

// Q&A 수정
settingRouter.put('/quest/:questId', authMiddleware, async (req, res, next) => {
	let result = { status: 'success' };
	try {
		const user = res.locals.user;
		const questId = req.params.questId;
		const { n } = await QuestBoard.updateOne({ _id: questId, userId: user.id }, { title: req.body.title, contents: req.body.contents });
		if (!n) {
			result['status'] = 'fail';
		}
		console.log(n)
		console.log(questId)
		console.log(user)

	} catch (err) {
		result['status'] = 'fail';
	}
	res.json(result);
});



// Q&A 삭제
settingRouter.delete('/quest/:questId', authMiddleware, async (req, res) => {
	let result = { status: 'success' };
	try {
		const questId = req.params.questId;
		const user = res.locals.user;
		const { deletedCount } = await QuestBoard.deleteOne({ _id: questId, userId: user.id });
		if (!deletedCount) {
			result['status'] = 'fail';
		}
		console.log(questId)
		console.log(user)

	} catch (err) {
		result['status'] = 'fail';
	}
	res.json(result);
});


module.exports = { settingRouter };