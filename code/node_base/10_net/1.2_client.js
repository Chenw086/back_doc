const net = require("net");

const client = net.createConnection({
  port: 1234,
  host: "127.0.0.1",
});

client.on("connect", () => {
  client.write("陈伟");
});

client.on("data", (chunk) => {
  console.log(chunk.toString());
});

client.on("error", (err) => {
  console.log(err);
});

client.on("close", () => {
  console.log("客户端断开了");
});
