const fs = require("fs");
const path = require("path");

/*  
    正常操作中，关于路径应该都尽可能的做成绝对路径
*/

// readFile
/* fs.readFile(path.resolve("data.txt"), "utf-8", (err, data) => {
  console.log(err);
  if (!null) {
    console.log(data); // 陈伟哈哈哈哈哈哈  （读取到文件里面原本的内容）
  }
});
 */
// writeFile
/* fs.writeFile('data.txt', '呀呀呀', (err) => {
    if(!err) {
        fs.readFile('data.txt', 'utf-8', (err, data) => {
            if(!err) {
                console.log(data)  // 呀呀呀
            }
        })
    }
}) */

/* fs.writeFile('data.txt', '呀呀呀', {
    mode: 438,
    flag: 'r+',  // 可读可写
    encoding: 'utf-8'
}, (err) => {
    if(!err) {
        fs.readFile('data.txt', 'utf-8', (err, data) => {
            if(!err) {
                console.log(data)  // 呀呀呀
            }
        })
    }
}) */

// appendFile
/* fs.appendFile('data.txt', '陈伟', (err) => {
    console.log('写入成功')  // 在文件后面追加内容
}) */

// copyFile
/* fs.copyFile('data.txt', 'test.txt', () => {
    console.log('拷贝成功')  // 同目录级别出现 text.txt 文件，内容与 data.txt 里面内容以一样
}) */

// watchFile: 运行后进程不会停止，修改文件以后会调用
/* fs.watchFile(
  "data.txt",
  {
    interval: 20, // 每 20ms 监控一次是否有变化
  },
  (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      // 两个修改时间比对，不对就说明改过
      console.log("文件被修改了");

      // 取消身上的所有监控
      fs.unwatchFile("data.txt");
    }
  }
); */
