const express = require('express');
const boardRouter = express.Router();
const jwt = require("jsonwebtoken");
const HomeBoard = require('../schema/homeBoard');
const User = require('../schema/user');
const authMiddleware = require("../middlewares/auth-middleware");
const multer = require('multer');

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

//test2
boardRouter.get("/tt2", authMiddleware, async (req, res) => {
  console.log(res.locals.user);
  res.send({ mss: "아직 테스트중입니다" });
});


// 게시글 조회
boardRouter.get('/:markerId',async(req,res)=>{
  const {markerId} = req.params;
  try {
    board_list = await HomeBoard.find({markerId:markerId});
    res.send(board_list);
  } catch (error) {
    res.send({mss: "게시글 조회에 실패했습니다."})
  }
})

// 게시글 조회
// boardRouter.get('/:markerId', authMiddleware, async (req, res) => {
//   const {markerId} = req.params;
//   let result = { status: 'success', boardsData: [] };
//   try {
//     const user = res.locals.user;
//     let boardsData = await HomeBoard.find().sort({ date: -1 });
//     for (homeBoard of boardsData) {
//       let temp = {
//         boardId: homeBoard["_id"],
//         userId: homeBoard["userId"],
//         title: homeBoard["title"],
//         contents: homeBoard["contents"],
//         nickname: homeBoard["nickname"],
//         date: homeBoard["date"],
//         img: homeBoard["img"]
//       };
//       result['boardsData'].push(temp);
//     }
//   } catch (err) {
//     console.log(err);
//     result['status'] = 'fail';
//   }
//   res.json(result);
// });

// 게시글 추가
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

boardRouter.post('/:markerId', upload.single('images'), authMiddleware, async (req, res) => {
  const {markerId} = req.params;
  const user = res.locals.user;
  let images = '';

if(req["file"]){ 
  console.log(req.file) 
  images = req.file.filename  
}
console.log(req.body.title)
  try {
    const result = await HomeBoard.create({
      markerId: markerId,
      title: req.body['title'],
      contents: req.body['contents'],
      nickname: user.nickname,
      userId: user.id,
      img: images
    });
    res.send({ result: result });
    console.log(result)
  } catch (err) {
    res.send({ mss : "오류입니다." })
  }
});


// 게시글 수정
boardRouter.put("/:boardId", authMiddleware, async (req, res) => {
  let result = { status: "success", boardsData : [] };
  try {
    const user = res.locals.user;
    console.log(user.id)
    const boardId = req.params.boardId;
    if (req.body["img"]) {
      const { n } = await HomeBoard.updateOne(
        { _id: boardId, userId: user.id },
        { markerId : req.body.markerId, title: req.body.title, contents: req.body.contents, img: req.body.img }
      );
      console.log(n)
      if (!n) {
        result["status"] = "fail";
      }
      let boardsData = await HomeBoard.findOne({ _id : boardId, userId : user.id })
      let temp = { img : boardsData['img']}
      result["boardsData"].push(temp);
    } else {
      const { n } = await HomeBoard.updateOne(
        { _id: boardId, userId: user.id },
        { markerId : req.body.markerId, title: req.body.title, contents: req.body.contents }
      );
      console.log(n)
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
