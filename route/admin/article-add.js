//引入formidable处理二进制表单数据
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    //1.创建表达解析对象
    const form = new formidable.IncomingForm();
    //2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //3.保留上传文件的后缀，默认不保留
    form.keepExtensions = true;
    //4.解析表单
    form.parse(req, async(err, fields, files) => {
        //1.err错误对象，解析成功则为空
        //2.fields 对象类型，保存普通表单数据
        //3.files 对象类型 保存了和上传文件相关的数据
        //截取上传文件的路径 files.cover.path.split('public')[1]
        let { title, author, publishDate, content } = fields;
        let cover = files.cover.path.split('public')[1];
        await Article.create({
            title,
            author,
            cover,
            publishDate,
            content,
        });
        //将页面重新定向到文章列表页面
        res.redirect('/admin/article');
    })
}