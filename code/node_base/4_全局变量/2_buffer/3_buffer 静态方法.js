/*  
    Buffer：静态方法
*/

/*  
    concat(bufArr[, length])
        bufArr：要拼接的 buffer，数组
        length：想要得到的 buffer 长度
*/
const b1 = Buffer.from('陈伟')
const b2 = Buffer.from('滴哈')
const b3 = Buffer.concat([b1, b2])
console.log(b3)  // <Buffer e9 99 88 e4 bc 9f e6 bb b4 e5 93 88>
console.log(b3.toString())  // 陈伟滴哈
console.log(Buffer.concat([b1, b2], 4))  // <Buffer e9 99 88 e4>

/*  
    isBuffer
*/
const b4 = Buffer.alloc(4)
console.log(Buffer.isBuffer(b4))  // true