const { Article } = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //接收客户端传递过来的页码
    const pageNow = req.query.page || 1;
    //查询文章
    let result = await Article.find().populate('author').lean();
    //page()当前页码，size()每页条数，display()分页栏显示几页，末尾调用exec()发送查询请求
    let { page, display, pages } = await pagination(Article).find().page(pageNow).size(10).display(10).exec();
    console.log(page, display, pages);
    //渲染模板并传递数据
    res.render('home/default.art', {
        result,
        page,
        display,
        pages
    })
}