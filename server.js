const express = require("express");
const router = express.Router();
const app = express();
const port = 9090;
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const server = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/jidojido", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      ignoreUndefined: true,
      useFindAndModify: false,
      // user: "test",
      // pass: "test",
    });

    const userRouter = require('./routers/userRouter');

    app.use("/user",[userRouter]);

    app.listen(port,()=>{
        console.log("서버가 성공적으로 열렸습니다!")
    });

    } catch (error) {
        console.log(error);
    }
};

server();