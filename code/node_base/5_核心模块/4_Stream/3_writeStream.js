/*  
  自定义可写流
    1. 继承 stream 模块的 writeable
    2. 重写 _write 方法,调用 write 执行写入
*/

const { Writable } = require("stream");

class MyWriteable extends Writable {
  constructor() {
    super();
  }

  _write(chunk, en, done) {
    process.stdout.write(chunk.toString() + "------");
    process.nextTick(done);
  }
}

let myWriteable = new MyWriteable();

myWriteable.write("陈伟", "utf8", () => {
  console.log("写入成功");
});
