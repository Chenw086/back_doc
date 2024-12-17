const http = require("http");
/* http.get(
  {
    host: "localhost",
    port: 1234,
    path: "/?a=1",
  },
  (res) => {}
); */

let options = {
  host: "localhost",
  port: 1234,
  path: "/?a=1",
  method: "POST",
  headers: {
    // "Content-type": "application/json",
    "Content-type": "application/w-www-form-urlencoded",
  },
};

let req = http.request(options, (res) => {
  let arr = [];
  res.on("data", (data) => {
    arr.push(data);
  });
  res.on("end", () => {
    console.log(Buffer.concat(arr).toString());
  });
});

// JSON 格式的数据
// req.end('{"name":"chenWei"}');

// 表单格式
req.end("a=1&b=2");
