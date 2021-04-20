const express = require("express");
const artinfoRouter = express.Router();
const artinfo = require("../schema/artinfo");
//요청에 대한 정보를 콘솔에 기록해준다.
const morgan = require("morgan");
const axios = require("axios");
const convert = require('xml-js');
const request = require('request');

const currentPut = async () => {
  let response;
  try {
    response = await axios.get(
      "http://www.kopis.or.kr/openApi/restful/pblprfr?service=bbae806ef8974970a6a19a7ddaa8420e&stdate=20210101&eddate=20210630&rows=30&cpage=1&signgucode=11&prfstate=02&shcate=AAAA"
    );

  } catch (e) {
    console.log(e);
  }
  return response;
};

artinfoRouter.get("/", (req, res) => {
  currentPut().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");  //cors policy 해결
    //console.log(response.data);
    console.log(convert.xml2json(response.data,{compact:true,spaces:4}));
    res.send(convert.xml2json(response.data,{compact:true,spaces:4}))
    //res.json(response.data.response.body);
    //res.json(response);
});
}); //node서버에서 프론트서버로 데이터를 보내기 위한 코드


module.exports = { artinfoRouter };