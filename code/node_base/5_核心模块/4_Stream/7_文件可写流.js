const fs = require("fs");

const ws = fs.WriteStream("test.txt", {
  flag: "w", // 写的模式
  mode: 438, // 默认权限
  fd: null,
  encoding: "utf8",
  start: 0,
  highWaterMark: 3,
});

/*  
  write 能多次的调用
*/
/* ws.write("陈伟", () => {
  console.log("数据写完了");
});
ws.write("11111", () => {
  console.log("数据写完了11");
}); */

ws.on("open", (fd) => {
  console.log("open", fd);
});

/*  
  默认不会关闭
    写入数据也不会触发关闭
    调用 end 方法以后， 就会关闭文件了
*/
ws.on("close", () => {
  console.log("文件关闭了");
});

ws.write("1");

/*  
  end 以后写入操作完成，就不能继续写入数据了
*/
ws.end("2");
