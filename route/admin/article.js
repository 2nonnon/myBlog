// 将文章集合构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块，实现分页
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //接收客户端传递过来的页码
    const pageNow = req.query.page || 1;
    //这是一个标识，表示当前访问的是文章管理页面，locals下的参数在模板中可以直接拿到
    req.app.locals.currentLink = 'article';
    //查询所有文章数据,链式调用populate()实现多集合联合查询
    // 在查询连上调用lean(),返回普通对象，否则会返回文档对象造成堆栈溢出
    let articles = await Article.find().populate('author').lean();
    //page()当前页码，size()每页条数，display()分页栏显示几页，末尾调用exec()发送查询请求
    let { page, display, pages } = await pagination(Article).find().page(pageNow).size(10).display(10).exec();

    // res.send(articles);
    //渲染文章列表页面模板
    res.render('admin/article.art', {
        articles,
        page,
        display,
        pages,
    })
}