const fs = require("fs");

// access: 判断目录或文件是否有操作权限
/* fs.access("a.txt", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("有权限");
  }
}); */

// stat：目录及文件信息
/* fs.stat("a.txt", (err, statObj) => {
  console.log(statObj);
  console.log(statObj.isFile()); // 是否是文件
  console.log(statObj.isDirectory()); // 是否是目录
  console.log(statObj.size); // 文件大小
}); */

/*  
    mkdir：创建目录
*/
/* fs.mkdir('a', (err) => {
    if(!err) {
        console.log('创建成功')
    } else {
        console.log(err)
    }
}) */

// 会创建一个 index.css 目录
/* fs.mkdir('index.css', (err) => {
    if(!err) {
        console.log('创建成功')
    } else {
        console.log(err)
    }
}) */

// 递归创建目录需要开启：recursive
/* fs.mkdir('a/b/c/d',{recursive: true}, (err) => {
    if(!err) {
        console.log('创建成功')
    } else {
        console.log(err)
    }
}) */

/*  
    rmdir
*/

// 只删除了 c
/* fs.rmdir('a/b/c/d', err => {
    if(!err) {
        console.log('删除成功')
    } else {
        console.log(err)
    }
}) */

// 删除一个非空的目录
/* fs.rmdir('a',{recursive: true}, err => {
    if(!err) {
        console.log('删除成功')
    } else {
        console.log(err)
    }
}) */

/*  
    readdir
*/
/* fs.readdir('a', (err, files) => {
    console.log(files)  // 打印下面一级里面的文件名，数组形式
}) */

/*  
    unlink
*/
/* fs.unlink('a/b/index.txt', (err) => {
    if(!err) {
        console.log('删除完成')
    } else {
        console.log(err)
    }
}) */
