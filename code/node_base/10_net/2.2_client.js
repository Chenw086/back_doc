const net = require("net");

const client = net.createConnection({
  port: 1234,
  host: "127.0.0.1",
});

client.on("connect", () => {
  client.write("陈伟");
  client.write("陈伟1");
  client.write("陈伟2");
  client.write("陈伟3");
});

let dataArr = ["陈伟1", "陈伟2", "陈伟3", "陈伟4", "陈伟5"];

/*  
  如果不这样写的话， 就会发生粘包，上面不延迟发送可以看到现象
*/
// client.on("connect", () => {
//   for (let i = 0; i < dataArr.length; i++) {
//     (function (val, index) {
//       setTimeout(() => {
//         client.write(val);
//       }, 1000 * index);
//     })(dataArr[i], i);
//   }
// });

client.on("data", (chunk) => {
  console.log(chunk.toString());
});

client.on("error", (err) => {
  console.log(err);
});

client.on("close", () => {
  console.log("客户端断开了");
});
