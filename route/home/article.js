const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    //接收客户端传来的文章id
    const id = req.query.id;
    //根据id查询文章信息
    let article = await Article.findOne({ _id: id }).populate('author').lean();
    //查寻文章对应评论
    let comments = await Comment.find({ aid: id }).populate('uid').lean();

    // res.send(comments);

    res.render('home/article.art', {
        article,
        comments,
    })
}