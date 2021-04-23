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
markerRouter.post("/", authMiddleware, async (req, res) => {
    const { location, markertype, markername,address } = req.body;
    try {
        await Marker.create({ location: location, markertype: markertype, markername: markername,address:address});
        Id = await Marker.findOne({ location: location });
        console.log(Id);
        res.status(200).send({ mss: "마커 저장 성공", markerId: Id['_id'] });
    } catch (error) {
        res.status(400).send({ mss: "마커 저장 실패" })
    }
});

// 마커 조회
markerRouter.get("/display", async (req, res) => {
    try {
        whole_marker = await Marker.find();
        res.send(whole_marker);
    } catch (error) {
        res.status(400).send({ mss: "마커 조회 실패" });
    }
});

// 마커 삭제
markerRouter.delete("/", async (req, res) => {
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

