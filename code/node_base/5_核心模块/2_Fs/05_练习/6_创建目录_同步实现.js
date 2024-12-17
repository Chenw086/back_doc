const fs = require('fs')
const path = require('path')

/*  
    1. a/b/c --> ['a', 'b', 'c']
    2. 对数组进行遍历，拿到每一项与前一项进行拼接
*/

function makeDIrSync(dirPath) {
    let items = dirPath.split(path.sep/*当前系统的分隔符*/)
    // console.log(path.sep)  // \
    for(let i = 1; i <= items.length; i++) {
        let dir = items.slice(0, i).join(path.sep)
        try {
            fs.accessSync(dir)
        } catch (error) {
            fs.mkdirSync(dir)
        }
    }
}
makeDIrSync('a\\b\\c')