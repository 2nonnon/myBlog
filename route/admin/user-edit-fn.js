//引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
//引入加密模块
const bcrypt = require('bcrypt');
const e = require('express');

module.exports = async(req, res, next) => {
    //验证用户信息
    try {
        //验证
        await validateUser(req.body);
    } catch (err) {
        //验证没有通过
        // err.message
        //重定向回用户添加页面
        // return res.redirect(`/admin/user-edit?message=${err.message}`);
        //JSON.stringify() 将对象数据类型转换为字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: err.message }));
    }

    //根据邮箱地址查询用户
    let user = await User.findOne({ email: req.body.email });
    //若返回值不为空说明被占用
    if (user) {
        //重定向回用户添加页面
        // return res.redirect(`/admin/user-edit?message=邮箱地址已被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已被占用' }));
    }

    //密码加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密密码
    const password = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = password;

    //将用户信息添加到数据库
    await User.create(req.body);
    //将页面重定向回用户列表页面
    res.redirect('/admin/user');
}