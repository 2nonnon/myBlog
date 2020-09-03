//导入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    //接受客户端发来的请求参数
    const { content, uid, aid } = req.body;
    //将评论信息存储到评论集合中
    await Comment.create({
        content,
        uid,
        aid,
        time: new Date(),
    });

    //将页面重新定向回文章详情页面
    res.redirect('/home/article?id=' + aid);
}