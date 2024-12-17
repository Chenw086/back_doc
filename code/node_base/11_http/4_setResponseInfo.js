const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 302;
  res.setHeader("Content-type", "text/html;charset=utf-8");
  res.write("ok");
  res.end("陈伟"); // end 以后才是结束
});

server.listen(1234, () => {
  console.log("服务开启了");
});
