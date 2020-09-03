//引入joi模块
const Joi = require('joi');

//定义对象的验证规则
const schema = Joi.object({
    username: Joi.string().min(2).max(20).required().error(new Error('username属性没有通过验证')),
});

//验证
async function run() {
    try {
        const value = await schema.validateAsync({});
        console.log(value);
    } catch (ex) {
        console.log(ex.message);
        return
    }
    console.log("ok");
}

run();