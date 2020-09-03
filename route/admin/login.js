//导入用户集合构造函数
const { User } = require('../../model/user');
//导入bcrypt,哈希加密模块
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    //接收请求参数
    const { email, password } = req.body;
    //如果用户没有输入邮件地址或者密码的话
    // if (email.trim().length == 0 || password.trim().length == 0) {
    //     return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
    // }
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });
    }
    //根据邮箱地址查询用户信息
    //如果查询到用户 user变量的值是对象类型 对象中存储的是用户信息
    //如果没有查询到 user变量值为空
    let user = await User.findOne({ email });
    //查询到了用户
    if (user) {
        //比对客户端传递过来的密码和用户信息中的密码
        //compare方法返回结果为布尔值，成功为true
        let isValid = await bcrypt.compare(password, user.password);
        // 如果密码比对成功
        if (isValid) {
            //登录成功
            // 将用户名存储在请求对象中
            req.session.username = user.username;
            // 将用户角色存储在请求对象中
            req.session.role = user.role;
            // res.send('登陆成功')
            // 将用户信息开放到locals
            req.app.locals.userInfo = user;
            // 判断用户角色
            if (user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user')
            } else {
                // 重定向到博客页面
                res.redirect('/home/')
            }

        } else {
            //没有查询到用户
            res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
        }
    } else {
        //没有查询到用户
        res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
    }
}