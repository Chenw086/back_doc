/* setTimeout(() => {
  console.log("s1");
});

Promise.resolve().then(() => {
  console.log("p1");
});

console.log("start");

process.nextTick(() => {
  console.log("tick");
});

setImmediate(() => {
  console.log("setImmediate");
});

console.log("end"); */

/*  
    start
    end
    tick
    p1
    s1
    setImmediate
*/

/* ********************* 上下不相关 *********************** */

/* setTimeout(() => {
  console.log("s2");
  Promise.resolve().then(() => {
    console.log("p2");
  });
  process.nextTick(() => {
    console.log("t2");
  });
});

Promise.resolve().then(() => {
  console.log("p3");
});

console.log("start");

setTimeout(() => {
  console.log("s3");
  Promise.resolve().then(() => {
    console.log("p4");
  });
  process.nextTick(() => {
    console.log("t3");
  });
});

console.log("end"); */

/*  
    start
    end
    p3
    s2
    t2
    p2
    s3
    t3
    p4
*/

const fs = require("fs");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
setImmediate(() => {
  console.log("setImmediate");
});
fs.readFile("./file.txt", () => {
  console.log("file callback");
});
process.nextTick(() => {
  console.log("nextTick");
});
console.log("start");
// 输出：
// start
// nextTick
// setTimeout
// setImmediate
// file callback
