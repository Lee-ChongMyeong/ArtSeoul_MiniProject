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



//test
boardRouter.get("/tt", async (req, res) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");

  const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
  console.log(userId);
  const user = await User.findOne({ id: userId });
  console.log(user);
  res.send({ mss: "아직 테스트중입니다" });
});

//내 게시글 조회
boardRouter.get("/myboard", authMiddleware, async (req, res) => {
  try {
    const user = res.locals.user;
    const myboard = await HomeBoard.find({ userId: user["id"] });
    res.send(myboard);
  } catch (error) {
    res.send({mss:"내게시글 조회에 실패했습니다."})
  }
});


// 게시글 조회
// boardRouter.get('/:markerId', async (req, res) => {
//   const { markerId } = req.params;
//   try {
//     board_list = await HomeBoard.find({ markerId: markerId });
//     res.json({ status : 'success', board_list });
//   } catch (error) {
//     res.json({ mss: "게시글 조회에 실패했습니다." })
//   }
// })

// 게시글 조회
// 무한스크롤
boardRouter.get('/:markerId', async (req, res) => {
  const {markerId} = req.params;
  let result = { status: 'success', boardsData: [] };

  //Data = await HomeBoard.find({ markerId : markerId })
  
  try {
    const print_count = 5;
    let lastId = req.query["lastId"];
    console.log(lastId);
    // * 이건 무슨선언이죠?
    let boardsData;

    if (lastId) {
      // 무한 스크롤 이전 페이지가 있을 경우
      boardsData = await HomeBoard.find({ markerId : markerId })
        .sort({ date: -1 })
        .where("_id")
        .lt(lastId) // 미만
        .limit(print_count); //_id = townId
    } else {
      // 무한 스크롤 첫 페이지일 경우
      boardsData = await HomeBoard.find({ markerId : markerId })
        .sort({ date: -1 })
        .limit(print_count);
    }



    for (homeBoard of boardsData) {
      const profileData = await User.findOne({id:homeBoard["userId"]},{profile:1});
      let temp = {
        boardId: homeBoard["_id"],
        userId: homeBoard["userId"],
        title: homeBoard["title"],
        contents: homeBoard["contents"],
        nickname: homeBoard["nickname"],
        markerId : homeBoard["markerId"],
        markername : homeBoard["markername"],
        date: homeBoard["date"],
        img: homeBoard["img"],
        profile : profileData
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
// storage 경로 선언
// 그리고 파일네임 선언
// cb ?
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

// 파일필터?
// 마인파일? mimetype 
// pdf 같은거 걸러주기 위하여
function fileFilter(req, file, cb) {
   const fileType = file.mimetype.split('/')[0] == 'image';
   if (fileType) cb(null, true);
   else cb(null, false);
}

// 업로드 storage 경로 위에서 선언해놨던거 사용
// fileFilter가 뭔가요?
// 아 이게 미들웨어함수였군,,,?
const upload = multer({
   storage: storage,
   fileFilter: fileFilter
});


// 게시글 추가
// populate를 위한 밑작업 완료
// upload.single 미들웨어 추가
boardRouter.post('/:markerId', upload.single('images'), authMiddleware, async (req, res) => {
  const {markerId} = req.params;
  const user = res.locals.user;
  console.log(user["_id"]);
  
  let image = '';
  userprofile = user["profile"];

if(req["file"]){ 
  console.log(req["file"])
  console.log(req.file) 
  images = req.file.filename
  image = 'http://13.125.250.74:9090/' + req.file.filename  
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
    // board count
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
    image = 'http://13.125.250.74:9090/' + req.file.filename  
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

// 다른사람 게시글
// 게시글추가부터 작업해야함(작업했음..)
// 그사람 프로필사진
boardRouter.get("/other/:userId",async(req,res)=>{
  try {
    let other = req.params;
    const userId = await User.find({id:other["userId"]},{_id:1});
    const a = await HomeBoard.find({user:userId}).populate({path:"user",select:"profile nickname id"});
    res.send(a);
  } catch (error) {
    res.send({mss:"조회에 실패했습니다."})
  }
})

module.exports = { boardRouter };