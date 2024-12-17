const fs = require('fs')
const path = require('path')

// open
/*  
    为什么第一个是 3：因为 012 被标准输入输出错误占了
*/
/* fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
    console.log(fd)  // 3
}) */

// close
fs.open('data.txt', 'r', (err, fd) => {
    console.log(fd)
    fs.close(fd, err => {
        console.log('关闭成功')
    })
})