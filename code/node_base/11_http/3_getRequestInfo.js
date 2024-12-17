const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);

  console.log(pathname, "------------", query);
  /*  
    浏览器输入：http://127.0.0.1:1234/index.html?a=1
    打印：/index.html ------------ [Object: null prototype] { a: '1' }
  */

  // 请求方式
  // console.log(req.method);

  // 版本号
  // console.log(req.httpVersion);

  // 请求头
  // console.log(req.headers);

  // 请求体数据获取
  let arr = [];
  req.on("data", (data) => {
    arr.push(data);
  });
  req.on("end", () => {
    console.log(Buffer.concat(arr).toString());
    /*  
      postMan 里面发送请求尝试， 这里显示
      {
          "test": 1
      }
    */
  });
});

server.listen(1234, () => {
  console.log("服务开启了");
});
