const { Readable } = require("stream");

/*  
  重写可读流的 read 操作
*/

// 模拟底层数据
let source = ["lg", "zce", "syy"];

// 自定义类的继承
class MyReadable extends Readable {
  constructor(source) {
    super();
    this.source = source;
  }
  _read() {
    let data = this.source.shift() || null;
    this.push(data);
  }
}

// 实例化
let myReadable = new MyReadable(source);

// 所有的流操作继承了 eventEmitter
// myReadable.on("readable", () => {
//   let data = null;
//   while (
//     (data = myReadable.read(/* 这里可以传入一个想要每次拿到的字节长度 */)) !==
//     null
//   ) {
//     console.log(data.toString());
//     /*
//       lgzce
//       syy
//     */
//   }
// });

myReadable.on("data", (chunk) => {
  console.log(chunk.toString());
});
