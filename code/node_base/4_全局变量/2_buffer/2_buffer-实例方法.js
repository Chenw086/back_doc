/*  
    Buffer 实例方法
*/

/*  
    fill(数据[,index[,index1]])
        如果填充不足以填充满就会反复填充
        如果填充足以填充满就会截断填充
        index 表示，写入初始位置
        index1 表示：写入结束位置
*/
let buf = Buffer.alloc(6);
buf.fill("123", 1, 3);
console.log(buf); // <Buffer 00 31 32 00 00 00>
console.log(buf.toString()); // 12

/*  
    write(数据[,start[,end]])
        传入不足以填满，不会反复写入占满

*/
let buf1 = Buffer.alloc(6);
buf1.write("123", 1);
console.log(buf1);
console.log(buf1.toString());

/*  
    toString([格式[, start[, end]]])
        格式：编码格式，默认 utf8
        start：开始下标，默认0
        end：结束位置，默认 length
*/
let buf2 = Buffer.from("陈伟");
console.log(buf2); // <Buffer e9 99 88 e4 bc 9f>
console.log(buf2.toString()); // 陈伟

/*  
    slice(start[, end])
        start：开始截取的位置，默认 0，支持负数
        end：结束截取的位置， 默认 length 
*/
const buf3 = Buffer.from("陈伟嘿哈");
const buf4 = buf3.slice();
console.log(buf3); // <Buffer e9 99 88 e4 bc 9f e5 98 bf e5 93 88>
console.log(buf3.slice(-3).toString()); // 哈

/*  
    indexOf(data[,start=0])
        start：在复制对象的哪个位置写入
        sourceIndex：在源buffer哪个位置提取
        在 buffer 中查找数据
        @return: 如果找到返回索引开始，如果没找到返回 
*/
buf5 = Buffer.from("陈伟呀嘿");
console.log(buf5);
console.log(buf5.indexOf("伟")); // 3

/*  
    copy(buffer[, startIndex=0[,sourceIndex=0]])
*/
const b6 = Buffer.alloc(6);
const b7 = Buffer.from("陈伟");
b7.copy(b6, 0, 3);
console.log(b6, b7); // <Buffer e4 bc 9f 00 00 00> <Buffer e9 99 88 e4 bc 9f>
console.log(b6.toString(), b7.toString()); // 伟 陈伟
