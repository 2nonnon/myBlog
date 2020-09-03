const { User } = require('../../model/user');
const user = require('../../model/user');

module.exports = async(req, res) => {

    //这是一个标识，表示当前访问的是用户管理页面，locals下的参数在模板中可以直接拿到
    req.app.locals.currentLink = 'user';

    //获取地址栏中的信息,和id
    const { message, id } = req.query;

    //如果传递了id参数就是修改操作，否则是添加操作
    if (id) {
        //修改操作
        let user = await User.findOne({ _id: id });
        res.render('admin/user-edit', {
            message,
            user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    } else {
        //添加操作
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }


}