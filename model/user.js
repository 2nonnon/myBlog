//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');
//导入bcrypt,哈希加密模块
const bcrypt = require('bcrypt');
//引入joi模块
const Joi = require('joi');

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        //保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true,
    },
    //0 启用状态
    //1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});

//创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('non0713', salt);
    const user = await User.create({
        username: '2nonnon',
        email: '2nonnon@non.cn',
        password: pass,
        role: 'admin',
        state: 0,
    });
}
// createUser();

// 验证用户信息
const validateUser = (user) => {
    //定义对象的验证规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(20).required().error(new Error('用户名长度应为2-20字符')),
        email: Joi.string().email().required().error(new Error('邮箱格式错误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,16}$/).required().error(new Error('密码应为8-16位为大小写字母或数字')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('你不对劲')),
    });

    // 验证
    return schema.validateAsync(user);
}

//将用户集合作为模块成员导出
module.exports = {
    User,
    validateUser
}