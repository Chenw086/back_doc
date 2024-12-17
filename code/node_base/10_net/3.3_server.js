/*  
  解决粘包思想：
    发送的包都排序好：编号多少，长度多少，内容
    每次收到的chunk都进行解码的操作
  事实上包依然还是会粘包传送，因为传送机制就是如此，此处就是使用相应规则将包进行拆分
*/

const net = require("net");
const MyTransform = require("./3.1_myTransform");

const server = net.createServer();
let overageBuffer = null;
let ts = new MyTransform();

server.listen("1234", "localhost");
server.on("listening", () => {
  console.log("服务端运行在 1234");
});

server.on("connection", (socket) => {
  socket.on("data", (chunk) => {
    const msg = chunk.toString();
    if (overageBuffer) {
      chunk = Buffer.concat([overageBuffer, chunk]);
    }
    let packageLen = 0;

    /*  
      拿到数据的长度， 如果没有数据， 则会返回0
      循环拿到每一条chunk，截取到剩余的chunk进去循环在处理
      拿到的chunk解码，再次写回
      
    */
    while ((packageLen = ts.getPackageLen(chunk))) {
      const packageCon = chunk.slice(0, packageLen);
      chunk = chunk.slice(packageLen);
      const ret = ts.decode(packageCon);
      console.log(ret);
      socket.write(ts.encode(ret.body, ret.serialNum));
    }
    overageBuffer = chunk;
  });
});
