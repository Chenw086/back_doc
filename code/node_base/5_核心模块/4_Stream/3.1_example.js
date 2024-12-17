const fs = require("fs");
let rs = fs.createReadStream("./3.2_test1.txt");
rs.setEncoding("utf8");
let ws = fs.createWriteStream("./3.3_test2.txt");

rs.on("data", (chunk) => {
  ws.write(chunk);
});

/*  
  可写流事件
    pipe 事件:可读流调用 pipe() 方法时触发.
    unpipe 事件:可读流调用 unpipe() 方法时触发.
*/
