// 一、模块的导入与导出
/* const age = 18
const addFn = (x, y) => {
    return x + y
}
module.exports = {
    age,
    addFn
} */

// 二、module
module.exports = 111
console.log(module)

// 三、exports
/* exports.name = '哈哈'
console.log(module) */

// 四、同步加载
/* let name = '111'
const iTime = new Date()
while(new Date() - iTime < 4000) {
}
module.exports = name
console.log('m.js 被加载导入了', module) */

// module.exports = '哈哈'