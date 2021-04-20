const express = require("express");
const artinfoRouter = express.Router();
const artinfo = require("../schema/artinfo");
//요청에 대한 정보를 콘솔에 기록해준다.
const morgan = require("morgan");
const axios = require("axios");
const 


artinfoRouter.get("/", async (req, res) => {

})
  

module.exports = { artinfoRouter };