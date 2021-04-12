const express = require('express');
const boardRouter = express.Router();
const jwt = require("jsonwebtoken");
const HomeBoard = require('../schema/homeBoard');
const User = require('../schema/user');
const authMiddleware = require("../middlewares/auth-middleware");

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


//게시글 목록
boardRouter.get('/', authMiddleware, async (req, res) => {
  let result = { status: 'success', boardsData: [] };
  try {
    const user = res.locals.user;
    let boardsData = await HomeBoard.find().sort({ date: -1 });
    for (homeBoard of boardsData) {
      let temp = {
        boardId: homeBoard["_id"],
        userId: homeBoard["userId"],
        title: homeBoard["title"],
        contents: homeBoard["contents"],
        nickname: homeBoard["nickname"],
        date: homeBoard["date"],
        img: homeBoard["img"]
      };
      result['boardsData'].push(temp);
    }
  } catch (err) {
    console.log(err);
    result['status'] = 'fail';
  }
  res.json(result);
});

// 게시글 추가
// 마커안에있는 boardcount값 +1 부탁
boardRouter.post('/', authMiddleware, async (req, res) => {
  const user = res.locals.user;
  console.log(user)
  try {
    const result = await HomeBoard.create({
      markerId: req.body['markerId'],
      title: req.body['title'],
      contents: req.body['contents'],
      nickname: user.nickname,
      userId: user.id,
      img: req.body['img']
    });

    res.send({ result: result });
    console.log(result)
  } catch (err) {
    result['status'] = 'fail';
    res.json(result);
  }
});


// 게시글 수정
boardRouter.put("/:boardId", authMiddleware, async (req, res) => {
  let result = { status: "success" };
  try {
    const user = res.locals.user;
    console.log(user.id)
    const boardId = req.params.boardId;
    if (req.body["img"]) {
      const { n } = await HomeBoard.updateOne(
        { _id: boardId, userId: user.id },
        {  title: req.body.title, contents: req.body.contents, img: req.body.img }
      );
      console.log(n)
      if (!n) {
        result["status"] = "fail1";
      }
    } else {
      const { n } = await HomeBoard.updateOne(
        { _id: boardId, userId: user.id },
        { title: req.body.title, contents: req.body.contents }
      );
      console.log(n)
      if (!n) {
        result["status"] = "fail2";
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
