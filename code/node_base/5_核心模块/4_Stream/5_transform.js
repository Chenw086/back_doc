/*  
  自定义转换流
    继承 transform 类
    重写 _transform 方法，调用 push 和 callback
    重写 _flush 方法，处理剩余数据
*/
const { Transform } = require("stream");

class MyTransform extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback(null);
  }
}

let a = new MyTransform();
a.write("a");
a.write("b");
a.end("c");
a.pipe(process.stdout); // 控制台打印：ABC
