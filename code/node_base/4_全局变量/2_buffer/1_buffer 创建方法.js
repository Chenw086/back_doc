/*  
    创建 buffer
*/

/* alloc */
const b1 = Buffer.alloc(10);
console.log(b1); // <Buffer 00 00 00 00 00 00 00 00 00 00> 16 进制的形式进行表示

/* allocUnsafe */
const b2 = Buffer.allocUnsafe(10);
console.log(b2);

/* from */
const b3 = Buffer.from("1", "utf8"); // 第二个参数默认：utf-8
console.log(b3); // <Buffer 31> 字符串1，对应的 ascII dec:49 hex:31

const b4 = Buffer.from("中"); // 一个汉字是三个字节
console.log(b4); // <Buffer e4 b8 ad>

const b5 = Buffer.from([1, 2, 3]);
console.log(b5); // <Buffer 01 02 03>

const b6 = Buffer.from([0x60, 0b1001, 12]);
console.log(b6); // <Buffer 60 09 0c>
console.log(b6.toString("utf8"), "b6"); // `

/*  
    buffer.from 拷贝，拷贝的是值，并是不内存地址
*/
const b7 = Buffer.alloc(3);
const b8 = Buffer.from(b7);
console.log(b7, b8); // <Buffer 00 00 00> <Buffer 00 00 00>
b7[0] = 1;
console.log(b7, b8); // <Buffer 01 00 00> <Buffer 00 00 00>
