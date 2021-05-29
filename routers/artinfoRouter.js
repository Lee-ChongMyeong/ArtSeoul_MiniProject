const express = require("express");
const artinfoRouter = express.Router();
const artinfo = require("../schema/artinfo");
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

const currentPut2 = async () => {
  let response;
  try {
    response = await axios.get(
      "http://www.kopis.or.kr/openApi/restful/pblprfr?service=bbae806ef8974970a6a19a7ddaa8420e&stdate=20210101&eddate=20210630&rows=30&cpage=1&signgucode=11&prfstate=02&shcate=AAAB"
    );

  } catch (e) {
    console.log(e);
  }
  return response;
};

const currentPut3 = async () => {
  let response;
  try {
    response = await axios.get(
      "http://www.kopis.or.kr/openApi/restful/pblprfr?service=bbae806ef8974970a6a19a7ddaa8420e&stdate=20210101&eddate=20210630&rows=30&cpage=1&signgucode=11&prfstate=02&shcate=CCCA"
    );

  } catch (e) {
    console.log(e);
  }
  return response;
};

const currentPut4 = async () => {
  let response;
  try {
    response = await axios.get(
      "http://www.kopis.or.kr/openApi/restful/pblprfr?service=bbae806ef8974970a6a19a7ddaa8420e&stdate=20210101&eddate=20210630&rows=30&cpage=1&signgucode=11&prfstate=02&shcate=CCCC"
    );

  } catch (e) {
    console.log(e);
  }
  return response;
};

const currentPut5 = async () => {
  let response;
  try {
    response = await axios.get(
      "http://www.kopis.or.kr/openApi/restful/pblprfr?service=bbae806ef8974970a6a19a7ddaa8420e&stdate=20210101&eddate=20210630&rows=30&cpage=1&signgucode=11&prfstate=02&shcate=BBBA"
    );

  } catch (e) {
    console.log(e);
  }
  return response;
};

// 연극
artinfoRouter.get("/act", (req, res) => {
  currentPut().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    console.log(convert.xml2json(response.data,{compact:true,spaces:4}));
    res.send(convert.xml2json(response.data,{compact:true,spaces:4}))
  });
});

// 뮤지컬
artinfoRouter.get("/music", (req, res) => {
  currentPut2().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    console.log(convert.xml2json(response.data,{compact:true,spaces:4}));
    res.send(convert.xml2json(response.data,{compact:true,spaces:4}))
  });
});

//클래식
artinfoRouter.get("/classic", (req, res) => {
  currentPut3().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    console.log(convert.xml2json(response.data,{compact:true,spaces:4}));
    res.send(convert.xml2json(response.data,{compact:true,spaces:4}))
  });
}); 

// 국악
artinfoRouter.get("/koreansong", (req, res) => {
  currentPut4().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    console.log(convert.xml2json(response.data,{compact:true,spaces:4}));
    res.send(convert.xml2json(response.data,{compact:true,spaces:4}))
  });
}); 

// 무용
artinfoRouter.get("/dance", (req, res) => {
  currentPut5().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    console.log(convert.xml2json(response.data,{compact:true,spaces:4}));
    res.send(convert.xml2json(response.data,{compact:true,spaces:4}))
  });
}); 

module.exports = { artinfoRouter };