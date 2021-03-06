const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    //接收客户端传递过来的请求参数
    const { username, email, password, role, state } = req.body;
    //要修改的用户的id
    const id = req.query.id;
    //用id查找用户信息
    let user = await User.findOne({ _id: id });
    //密码比对
    const isValid = await bcrypt.compare(password, user.password);
    //比对成功
    if (isValid) {
        //将用户信息更新到数据库
        await User.updateOne({ _id: id }, {
            username,
            email,
            role,
            state,
        });
        //重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        //比对失败，调用错误处理中间件，传入错误信息并重新定向
        let obj = {
            path: '/admin/user-edit',
            message: '密码错误，无法修改个人信息',
            id,
        };
        next(JSON.stringify(obj));
    }
}