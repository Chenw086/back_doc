const fs = require("fs");

// read：所谓的读操作就是将数据从磁盘文件中写入到 buffer 中

// let buf = Buffer.alloc(10);
// fs.open("data.txt", "r", (err, rFd) => {
//   console.log(rFd); // 3
//   fs.read(
//     rFd,
//     buf,
//     1 /*当前从 buffer 哪个位置写入操作*/,
//     3 /*截取 length*/,
//     2 /*从磁盘文件的哪个位置开始读取*/,
//     (err, readBytes, data) => {
//       console.log(readBytes); // 3
//       console.log(data); // <Buffer 00 33 34 35 00 00 00 00 00 00>
//       console.log(data.toString()); // 345
//     }
//   );
// });

// write 将缓冲区里的内容写入磁盘文件中

/*  
    将 buffer 里面的数据写入到 b.txt 里面（如果没有则会自动创建 b.txt）
*/
let b1 = Buffer.from("陈伟来咯");
fs.open("b.txt", "w", (err, wfd) => {
  fs.write(
    wfd,
    b1,
    1 /*buffer 哪个位置读取数据*/,
    3 /*写入的字节长度*/,
    0 /*文件的那个字节开始写入*/,
    (err, written, buffer) => {
      console.log(written); // 表示实际写入的字节数
      console.log(buffer.toString());
      fs.close(wfd);
    }
  );
});

// fs.open("b.txt", "w", (err, wfd) => {
//   for (let i = 0; i < 10; i++) {
//     fs.write(wfd, b1, (err, written, buffer) => {});
//   }
// });
