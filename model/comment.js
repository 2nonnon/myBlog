//1.引入mongoose模块
const mongoose = require('mongoose');

//2.创建评论集合规则
const commentSchema = new mongoose.Schema({
    //文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    //用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //评论时间
    time: {
        type: Date,
    },
    //评论
    content: {
        type: String,
        required: true,
    }
});

//3.创建评论集合
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment,
}