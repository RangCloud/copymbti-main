const mongoose = require('mongoose');

// 비회원 정보
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxLength : 20
    }
})

// 모델로 감싸기
const User = mongoose.model('User', userSchema);

// 외부에서 사용 가능하게
module.exports = { User };