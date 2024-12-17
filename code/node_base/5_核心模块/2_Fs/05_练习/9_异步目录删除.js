const fs = require('fs')
const path = require('path')

/*  
    需求： 自定义一个函数，接收一个路径，然后执行删除操作
*/

function myRmdir(dirPath, cb) {
    fs.stat(dirPath, (err, statObj) => {
        if(statObj.isDirectory()) {
            /* 如果是目录就继续读取 */
            fs.readdir(dirPath, (err, files) => {
                let dirs = files.map(item => {
                    return path.join(dirPath, item)
                })
                let index = 0
                function next() {
                    if(index === dirs.length) return fs.rmdir(dirPath, cb)

                    let current = dirs[index++]
                    myRmdir(current, next)
                }
                next()
            })
        } else {
            /* 是文件就直接删除 */
            fs.unlink(dirPath, cb)
        }
    })
}

myRmdir('tmp', () => {
    console.log('删除成功')
})