const express = require('express');
const boardRouter = express.Router();
const jwt = require("jsonwebtoken");
const Board = require("../schema/HomeBoard");

boardRouter.get("/test",async(req,res)=>{
    console.log("잘연결됐으요~");
    res.send({mss:"테스트연결은 가연이가 해냈다구~~~"});
});

module.exports = {boardRouter};