const guard = (req, res, next) => {
    //判断用户访问的是否是登录页面
    //判断用户的登录状态
    //若已登录则放行，否则重定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        //如果用户是登录状态并且是普通用户
        if (req.session.role == 'normal') {
            //让他跳回博客首页，阻止程序向下进行
            return res.redirect('/home/');
        }
        // 登录则放行
        next();
    }
}

module.exports = guard;