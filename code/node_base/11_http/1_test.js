const net = require("net");

// 创建服务端
const server = net.createServer();

const PORT = 1234;
const HOST = "localhost";

server.listen(PORT, HOST);

server.on("connection", (socket) => {
  socket.on("data", (data) => {
    console.log(data.toString()); // 这里会打印 http 的请求信息， 各种请求头信息在里面
  });
  socket.end("test http request");
});
