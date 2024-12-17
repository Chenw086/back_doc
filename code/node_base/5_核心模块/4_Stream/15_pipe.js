/*  
    pipe 方法实现
*/
const fs = require('fs')
const myReadStream = require('./15.1_myReadStream')

/* const rs = fs.createReadStream('./test4.txt', {
    highWaterMark: 4  // 默认 64KB
}) */

/* const ws = fs.createWriteStream('./test5.txt', {
    highWaterMark: 1  // 默认 16kb
}) */

const rs = new myReadStream('./test4.txt')

const ws = fs.createWriteStream('./test5.txt')

rs.pipe(ws)