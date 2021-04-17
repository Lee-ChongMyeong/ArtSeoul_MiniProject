const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware.js");
const User = require("../schema/user");
const crypto = require('crypto');
require('dotenv').config();


// 테스트 연결코드
userRouter.get("/test", async (req, res) => {
    console.log("잘연결됐으요~");
    res.send({ mss: "테스트연결은 가연이가 해냈다구~~~" });
});

// 회원가입
// 비밀번호 확인란의 경우 프론트단에서 처리해서 제공
userRouter.post("/register", async (req, res) => {
    const { id, password, nickname } = req.body;
    console.log(id, password, nickname);

    const newpassword = crypto.createHash('sha512').update(password).digest('base64');
    
    console.log(newpassword);

    try {
        const existUsers = await User.find({ $or: [{ id }] });
        if (existUsers.length) {
            res.status(400).send({
                err: "이미 가입된 아이디가 있습니다.",
            });
            return;
        }

        await User.create({ nickname, id, password:newpassword });
        return res.status(201).send({ result: "회원가입 완료!" });

    } catch (error) {
        return res.status(400).send({ err: "회원가입에 실패했습니다." });
    }
});

// 로그인
userRouter.post("/login", async (req, res) => {
    let { id, password } = req.body;
    try {
        const newpassword = crypto.createHash('sha512').update(password).digest('base64');
        const user = await User.findOne().and([{ id }, { password:newpassword }]);
        if (!user) {
            return res
                .status(400)
                .send({ err: "아이디 또는 패스워드가 잘못됐습니다." });
        }
        const token = jwt.sign({ userId: user.id }, `${process.env.SECRET_KEY}`);
        return res.send({ result: { user: { token: token } } });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ err: err.message });
    }
});

// 내정보조회
userRouter.get("/", authMiddleware, async (req, res) => {
    const user = res.locals.user;
    try {
        usernickname = user["nickname"];
        userId = user["id"];
        return res.send([{ id: userId }, { nickname: usernickname }])
    } catch (error) {
        return res.send({ mss: "내정보조회에 실패했습니다" })
    }
})

module.exports = { userRouter };