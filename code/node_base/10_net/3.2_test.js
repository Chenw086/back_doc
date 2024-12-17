const myTransformCode = require("./3.1_myTransform");

let ts = new myTransformCode();
let str1 = "陈伟哈哈";

console.log(ts.encode(str1));
console.log(ts.decode(ts.encode(str1)));
console.log(ts.getPackageLen(ts.encode(str1)));

/*  
    <Buffer 00 01 00 0c e9 99 88 e4 bc 9f e5 93 88 e5 93 88>
    { serialNum: 1, bodyLength: 12, body: '陈伟哈哈' }
    16
*/
