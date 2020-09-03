module.exports = (req, res) => {

    //这是一个标识，表示当前访问的是文章管理页面，locals下的参数在模板中可以直接拿到
    req.app.locals.currentLink = 'article';

    res.render('admin/article-edit.art')
}