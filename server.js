const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.EXPRESS_PORT;

const connect = require('./schema/dbConnect');
connect();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const userRouter = require('./routers/userRouter');
app.use("/user",[userRouter]);
app.use("/board",[boardRouter]);
app.use("/marker",[markerRouter]);

app.listen(port, () => {
	console.log(`Server start at http://localhost:${port}`);
});


