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

//내게시글 조회
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

//게시글 조회
boardRouter.get('/:markerId', authMiddleware, async (req, res) => {
  const {markerId} = req.params;
  let result = { status: 'success', boardsData: [] };
  try {
    const print_count = 5;
    let lastId = req.query["lastId"];
    console.log(lastId);
    let boardsData;
    if (lastId) {
      // 무한 스크롤 이전 페이지가 있을 경우
      boardsData = await HomeBoard.find({ markerId : markerId })
        .sort({ date: -1 })
        .where("_id")
        .lt(lastId)
        .limit(print_count); //_id = townId
    } else {
      // 무한 스크롤 첫 페이지일 경우
      boardsData = await HomeBoard.find({ markerId : markerId })
        .sort({ date: -1 })
        .limit(print_count);
    }

    for (homeBoard of boardsData) {
      let temp = {
        boardId: homeBoard["_id"],
        userId: homeBoard["userId"],
        title: homeBoard["title"],
        contents: homeBoard["contents"],
        nickname: homeBoard["nickname"],
        markerId : homeBoard["markerId"],
        markername : homeBoard["markername"],
        date: homeBoard["date"],
        img: homeBoard["img"]
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
// upload.single 미들웨어 추가
boardRouter.post('/:markerId', upload.single('images'), authMiddleware, async (req, res) => {
  const {markerId} = req.params;
  const user = res.locals.user;
  let image = '';

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
      nickname: user.nickname,
      userId: user.id,
      img: image
    });
    console.log(result);
    await Marker.findOneAndUpdate({_id:markerId},{$inc:{boardcount:1}},{ new: true });
    // board count
    res.send({ result: result }); 
    
  } catch (err) {
    res.send({ mss : "오류입니다." })
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
      let boardsData = await HomeBoard.findOne({ _id: boardId, userId: user.id })
      console.log(boardsData)
      let temp = { img: boardsData['img'] }
      result["boardsData"].push(temp);

      if (!n) {
        result["status"] = "fail";
      }

//      let boardsData = await HomeBoard.findOne({ _id: boardId, userId: user.id })
     

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
    const { deletedCount } = await HomeBoard.deleteOne({
      _id: boardId,
      userId: user.id,
    });
    if (deletedCount) {
      await HomeBoard.deleteMany({ boardId: boardId });
    } else {
      result["status"] = "fail";
    }
  } catch (err) {
    result["status"] = "fail";
  }
  res.json(result);
});

module.exports = { boardRouter };
