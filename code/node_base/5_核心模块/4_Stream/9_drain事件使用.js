/*  
    drain 事件的使用
    需求： 将某文字写入指定的文件
    方案： 
        1. 一次性写入
        2. 分批写入
*/

let fs = require('fs')
let ws = fs.createWriteStream('test.txt', {
    highWaterMark: 3
})
// ws.write('陈伟哈哈')

let source = '陈伟嘻嘻'.split('')
let num = 0
let flag = true

function executeWrite() {
    flag = true
    while(num !== 4 && flag) {
        flag = ws.write(source[num++])
    }
}

executeWrite()

/*  
    进入这里面就代表能继续写入了
*/
ws.on('drain', () => {
    console.log('drain 事件执行了')
    executeWrite()
})