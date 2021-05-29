const express = require('express');
const boardRouter = express.Router();
const jwt = require("jsonwebtoken");
const HomeBoard = require('../schema/homeBoard');
const User = require('../schema/user');
const authMiddleware = require("../middlewares/auth-middleware");
const Marker = require('../schema/marker');
const multer = require('multer');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
require('dotenv').config();

//내 게시글 조회
boardRouter.get("/myboard", authMiddleware, async (req, res) => {
  try {
    const user = res.locals.user;
    const myboard = await HomeBoard.find({ user: user["_id"] });
    res.send(myboard);
  } catch (error) {
    res.send({mss:"내게시글 조회에 실패했습니다."})
  }
});


// 게시글 조회 (무한스크롤)
boardRouter.get('/:markerId', async (req, res) => {
  const {markerId} = req.params;
  let result = { status: 'success', boardsData: [] };
  try {
    const print_count = 5;
    let lastId = req.query["lastId"];
    console.log(lastId);
    let boardsData;

    if (lastId) {
      boardsData = await HomeBoard.find({ markerId : markerId })
        .sort({ date: -1 })
        .where("_id")
        .lt(lastId)
        .limit(print_count); 
    } else {
      boardsData = await HomeBoard.find({ markerId : markerId })
        .sort({ date: -1 })
        .limit(print_count);
    }
    
    for (homeBoard of boardsData) {
      const profileData = await User.findOne({_id:homeBoard.user});
      console.log('profileData', profileData);
      console.log('homeBoard', homeBoard);
      let temp = {
        boardId: homeBoard["_id"],
        userId: profileData["_id"],
        title: homeBoard["title"],
        contents: homeBoard["contents"],
        nickname: profileData["nickname"],
        markerId : homeBoard["markerId"],
        markername : homeBoard["markername"],
        date: homeBoard["date"],
        img: homeBoard["img"],
        profile : profileData["profile"]
      };
      result['boardsData'].push(temp);
    }
    if (boardsData.length < print_count) result["status"] = "end";
  } catch (err) {
    console.log(err);
    result['status'] = 'fail';
  }
  res.json(result);
});

// 사진추가
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/');
   },
   filename: function (req, file, cb) {
      let ex = file.originalname.split('.');
      console.log(ex) 
      cb(null, 'img' + Date.now() + parseInt(Math.random() * (99 - 10) + 10) + '.' + ex[ex.length - 1]);
   }
});

function fileFilter(req, file, cb) {
   const fileType = file.mimetype.split('/')[0] == 'image';
   if (fileType) cb(null, true);
   else cb(null, false);
}

const upload = multer({
   storage: storage,
   fileFilter: fileFilter
});


// 게시글 추가
boardRouter.post('/:markerId', upload.single('images'), authMiddleware, async (req, res) => {
  const {markerId} = req.params;
  const user = res.locals.user;
  console.log(user["_id"]);
  
  let image = '';
  userprofile = user["profile"];

if(req["file"]){  
  images = req.file.filename
  image = 'http://52.78.108.93/' + req.file.filename  
}

console.log(req.body.title)
  try {
    const result = await HomeBoard.create({
      markerId: markerId,
      markername : req.body["markername"],
      title: req.body['title'],
      contents: req.body['contents'],
      date : moment().format("YYYY-MM-DD HH:mm:ss"),
      user: user["_id"],
      img: image,
    });
    console.log(result);
    await Marker.findOneAndUpdate({_id:markerId},{$inc:{boardcount:1}},{ new: true });
    res.json({ result: result, currentprofile : userprofile}); 
    
  } catch (err) {
    res.json({ mss : "오류입니다." })
  }
});


// 게시글 수정
boardRouter.put("/:boardId", upload.single('image'), authMiddleware, async (req, res) => {
  
  let image = '';

  if(req["file"]){ 
    console.log(req["file"])
    console.log(req.file) 
    image = 'http://52.78.108.93/' + req.file.filename  
    console.log(image)
  } 
  
  let result = { status: "success", boardsData : [] };
  try {
    const user = res.locals.user;
    console.log(user.id)
    const boardId = req.params.boardId;
    if (req["file"]) {
      const { n } = await HomeBoard.updateOne(
        { _id: boardId, userId: user.id },  
        { markerId: req.body.markerId, title: req.body.title, contents: req.body.contents, img: image }
      );
      let boardsData = await HomeBoard.findOne({ _id: boardId, user: user["_id"] })
      console.log(boardsData)
      let temp = { img: boardsData['img'] }
      result["boardsData"].push(temp);

      if (!n) {
        result["status"] = "fail";
      }
    } else {
      const { n } = await HomeBoard.updateOne(
        { _id: boardId, userId: user.id },
        { markerId: req.body.markerId, title: req.body.title, contents: req.body.contents }
      );
      console.log("수" + n)
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
boardRouter.delete("/:boardId", authMiddleware, async (req, res) => {
  let result = { status: "success" };
  try {
    const boardId = req.params.boardId;
    const user = res.locals.user;
    const bb = await HomeBoard.findOne({ _id: boardId }); 
    console.log(bb);
    const { deletedCount } = await HomeBoard.deleteOne({
    _id: boardId,
    user: user["_id"],
    });

    if (deletedCount) {
      await Marker.findOneAndUpdate({_id:bb["markerId"]},{$inc:{boardcount: -1} },{ new: true });
    } else {
      result["status"] = "fail";
    }

  } catch (err) {
    result["status"] = "fail";
  }
  res.json(result);
});

// 프로필 사진 추가
boardRouter.get("/other/:userId",async(req,res)=>{
  try {
    let other = req.params;
    console.log(other);
    const a = await HomeBoard.find({userId:other["userId"]});
    const profile = await User.findOne({id:other["userId"]},{profile:1});
    console.log(profile["profile"]);
    res.send({profile:profile["profile"],contents:a});
  } catch (error) {
    res.send({mss:"조회에 실패했습니다."})
  }
})

module.exports = { boardRouter };