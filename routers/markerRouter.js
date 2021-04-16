const express = require('express');
const markerRouter = express.Router();
const jwt = require("jsonwebtoken");
const Marker = require("../schema/marker");
const HomeBoard = require('../schema/homeBoard');
const authMiddleware = require("../middlewares/auth-middleware");


markerRouter.get("/test", async (req, res) => {
    console.log("잘연결됐으요~");
    res.send({ mss: "테스트연결은 가연이가 해냈다구~~~" });
});

// 마커생성
// 마커를 생성해도 삭제는 일반유저가 못하니까 마커에 유저ID값 넣지않음
markerRouter.post("/", authMiddleware, async (req, res) => {
    const { location, markertype, markername } = req.body;
    try {
        await Marker.create({ location: location, markertype: markertype, markername: markername });
        Id = await Marker.findOne({ location: location });
        res.status(200).send({ mss: "마커 저장 성공", markerId: Id['_id'] });
    } catch (error) {
        res.status(400).send({ mss: "마커 저장 실패" })
    }

    // 마커아이디를 동시에 보내달라고하시는데 가능한가?
    // 안되네용^^
    // res.send("이거 두개를 동시에 보낼수 있나요?");
});

// 마커 조회
markerRouter.get("/display", async (req, res) => {
    try {
        whole_marker = await Marker.find();
        // 오오 str도 카카오가 좌표찍어준다고하네요 location Arr 굳이 숫자로 안바꿔줘도됨
        res.send(whole_marker);
    } catch (error) {
        res.status(400).send({ mss: "마커 조회 실패" });
    }
});

// 마커 삭제
markerRouter.delete("/", async (req, res) => {
    // 마커하나 삭제하면 그 마커아이디값갖고있는 홈보드 DB도 갈아줘야합니다.
    try {
        const { markerId } = req.body;
        await Marker.deleteOne({ _id: markerId });
        await HomeBoard.deleteMany({ markerId: markerId });
        res.status(200).send({ mss: "마커 삭제 성공" });
    } catch (error) {
        res.status(200).send({ mss: "마커 삭제 실패" });
    }
})

// 핫플레이스 마커
markerRouter.get("/display/detail", async (req, res) => {
    const hot_marker = await Marker.find({boardcount : {"$gte": 10}} ).sort({ boardcount: -1 });
    const normal_marker = await Marker.find({boardcount : {"$lt": 10}} ).sort({ boardcount: -1 });
    try {
        res.json({ status : "success", hot_marker : hot_marker, normal_marker : normal_marker });
    } catch (error) {
        res.json({ status : "fail"});
    }
});


module.exports = { markerRouter };

