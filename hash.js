//导入bcrypt
const bcrypt = require('bcrypt');

async function run() {
    //生成随机字符串
    //genSalt方法接收一个数值作为参数
    //数值越大 生成的随机字符串复杂度越高
    //默认值是10
    // 返回生成的随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密密码:bcrypt.hash(加密对象，随机字符串)，返回值为加密后的密码
    const result = await bcrypt.hash('12312313', salt);
    console.log(salt);
    console.log(result);
}

run();