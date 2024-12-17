const fs = require('fs')

/* 1. 打开 a 文件 */
let buf = Buffer.alloc(10)
// fs.open('a.txt', 'r+', (err, fd) => {
//     /* 2. 读取数据 */
//     /* 3. 写入数据 */
//     fs.open('b.txt', 'w', (err, wfd) => {
//         fs.read(fd, buf, 0, 10, 0, (err, readBytes, buffer) => {
//                 /* 4. 将 buffer 中的数据写入到 b.txt 中 */
//                 fs.write(wfd, buf, 0, 7, 0, (err, written, buffer) => {
//                     console.log('写入成功')
//                 })
//             })
//     })
// })

/* 递归大文件读写 */
const BUFFER_SIZE = buf.length
let readOffset = 0
fs.open('a.txt', 'r', (err, rfd) => {
    fs.open('b.txt', 'w', (err, wfd) => {
        function next() {
            fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {
                if(!readBytes) {
                    fs.close(rfd, () => {})
                    fs.close(wfd, () => {})
                    console.log('拷贝完成')
                    return
                }
                readOffset += readBytes
                fs.write(wfd, buf, 0, readBytes, (err, written) => {
                    console.log('++++++', written)
                    next()
                })
            })
        }
        next()
    })
})

