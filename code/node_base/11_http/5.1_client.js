const http = require("http");
let options = {
  host: "localhost",
  port: 1234,
  path: "/",
  method: "POST",
};

let server = http
  .createServer((request, response) => {
    let req = http.request(options, (res) => {
      let arr = [];
      res.on("data", (data) => {
        arr.push(data);
      });
      res.on("end", () => {
        // console.log(Buffer.concat(arr).toString());

        let ret = Buffer.concat(arr).toString();
        response.setHeader("Content-type", "text/html;charset=utf-8");
        response.end(ret);
      });
    });

    req.end("陈伟测试");
  })
  .listen(2345, () => {
    console.log("本地服务开启了");
  });
