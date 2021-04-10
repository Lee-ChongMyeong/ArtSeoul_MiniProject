const express = require('express');
const markerRouter = express.Router();
const jwt = require("jsonwebtoken");
const Marker = require("../schema/Marker");

markerRouter.get("/test",async(req,res)=>{
    console.log("잘연결됐으요~");
    res.send({mss:"테스트연결은 가연이가 해냈다구~~~"});
});

module.exports = {markerRouter};

