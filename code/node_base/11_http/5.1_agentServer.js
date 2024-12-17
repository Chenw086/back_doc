const http = require("http");
const url = require("url");
const querystring = require("querystring");

const server = http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url);
    console.log(pathname, "-----", query);

    let arr = [];
    req.on("data", (data) => {
      arr.push(data);
    });
    req.on("end", () => {
      let obj = Buffer.concat(arr).toString();
      // console.log(Buffer.concat(arr).toString());
      if (req.headers["content-type"] === "application/json") {
        let a = JSON.parse(obj);
        a.add = "回复一个内容给你";
        res.end(JSON.stringify(a));
      } else if (
        req.headers["content-type"] === "application/w-www-form-urlencoded"
      ) {
        let ret = querystring.parse(obj);
        res.end(JSON.stringify(ret));
      }
    });
  })
  .listen(1234, () => {
    console.log("服务跑起来了");
  });
