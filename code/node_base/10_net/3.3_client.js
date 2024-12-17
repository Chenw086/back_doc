const net = require("net");
const MyTransform = require("./3.1_myTransform");
let overageBuffer = null;
let ts = new MyTransform();
const client = net.createConnection({
  port: "localhost",
  port: 1234,
});

// 这样发送的话就会粘包
/* client.write("陈伟嘿哈");
client.write("陈伟嘿哈");
client.write("陈伟嘿哈");
client.write("陈伟嘿哈");
client.write("陈伟嘿哈"); */

client.write(ts.encode("陈伟喜喜"));
client.write(ts.encode("陈伟喜喜"));
client.write(ts.encode("陈伟喜喜"));
client.write(ts.encode("陈伟喜喜"));
client.write(ts.encode("陈伟喜喜"));
client.on("data", (chunk) => {
  const msg = chunk.toString();
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk]);
  }
  let packageLen = 0;
  while ((packageLen = ts.getPackageLen(chunk))) {
    const packageCon = chunk.slice(0, packageLen);
    chunk = chunk.slice(packageLen);
    const ret = ts.decode(packageCon);
    console.log(ret);
  }
  overageBuffer = chunk;
});
