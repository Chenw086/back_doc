/*  
    标准输入、输出、错误
*/
const fs = require('fs')

/* 标准输出 */
// process.stdout.write(`-- 哈哈`)  // 控制台打印：-- 哈哈
fs.createReadStream('5.1_test.txt').pipe(process.stdout)  // 控制台打印：陈伟滴滴滴

/* 标准输入 */
// process.stdin.pipe(process.stdout)  // 效果就是在控制台输入什么， 就会打印什么出来

/* 设置格式 */
process.stdin.setEncoding('utf-8')
process.stdin.on('readable', () => {
    let chunk = process.stdin.read()
    if(chunk !== null) {
        process.stdout.write('data' + chunk)
    }
})
