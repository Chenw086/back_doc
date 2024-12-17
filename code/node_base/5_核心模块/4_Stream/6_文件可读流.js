const fs = require("fs");

let rs = fs.createReadStream("./6.1_test.txt", {
  flags: "r",
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true, // 是否自动关闭文件
  start: 0, // 开始位置
  // end: 3, // 结束位置
  highWaterMark: 2, // 每次堵多少字节的数据
});

/* rs.on("data", (chunk) => {
  console.log(chunk.toString());

  rs.pause(); // 流动的时候暂停
  setTimeout(() => {
    rs.resume();
  }, 1000);
}); */

/*  
  readable 事件触发，就会在缓存区里面准备2字节长度数据，
  通过 read 在缓存区里面拿取数据，消耗。
*/
/* rs.on("readable", () => {
  let data;
  while ((data = rs.read(1)) !== null) {
    console.log(data.toString());
    console.log("----", rs._readableState.length); // 缓存区里面还有多少字节的位置
  }
}); */

rs.on("open", (fd) => {
  console.log(fd, " 文件打开了 "); // 3  文件打开了
});

/*  
  默认情况下不会自动的关闭文件
  但是如果监听了 'data' 事件，数据消费完毕以后， 就会触发 close
*/
rs.on("close", () => {
  console.log("文件关闭了");
});

let bufferArr = [];
rs.on("data", (chunk) => {
  bufferArr.push(chunk);
});

rs.on("end", () => {
  console.log(Buffer.concat(bufferArr).toString());
  console.log("数据被消耗完毕了");
});

rs.on("error", () => {
  console.log("出错了");
});
