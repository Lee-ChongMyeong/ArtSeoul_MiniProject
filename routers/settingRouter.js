const express = require('express');
const settingRouter = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");


// 환경설정
settingRouter.get("/", authMiddleware, async (req, res) => {
    try {
      res.send({ mss : "환경설정 테스트중 "})
    } catch (error) {
      res.send({mss:" 환경설정 테스트 실패"})
    }
  });


module.exports = { settingRouter };