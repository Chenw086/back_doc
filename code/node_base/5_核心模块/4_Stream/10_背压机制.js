/*  
    读流往写流里面写数据，如果速度过快，就暂停文件的读取。
    如果写入流里面有缓存能继续加载的时候，就调用 drain 事件，重启 rs 的读取

    实际操作中，除非要拿到每一个数据进行操作，否则是不会这样写的，一般直接 pipe
*/

let fs = require('fs')
let rs = fs.createReadStream('test.txt', {
    highWaterMark: 4
})
let ws = fs.createWriteStream('test1.txt', {
    highWaterMark:1
})

let flag = true

rs.on('data', (chunk) => {
    flag = ws.write(chunk, () => {
        console.log('正在写入 chunk')
    })

    /* 如果写入跟不上就先暂停 */
    if(!flag) {
        rs.pause()
    }
})

/* 进入就说明有空间可以写入了，可以开始操作了 */
ws.on('drain', () => {
    rs.resume()
})
