const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mtr008:YnqBi4FnjM3kIMY8@testcluster.srem4lm.mongodb.net/')
    .then(() => console.log('연결 완료'))
    .catch(err => console.log('연결 실패', err));

const saveNameRouter = require('./api/saveName');
app.use('/api', saveNameRouter);

app.listen(port, () => {
    console.log('서버 실행 중');
})