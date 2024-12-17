const fs = require("fs");
let ws = fs.createWriteStream("./test.txt", {
  highWaterMark: 3,
});

/*  
  flag 为 false 并不是说明数据不能被执行写入

  write 使用：
    1. 第一次调用 write 方法时是将数据直接写入到文件中。
    2. 第二次开始 write 方法就是将数据写入至缓存中
    3. 生产速度和消费速度是不一样得，一般情况下生产速度比消费速度快很多
    4. 当 flag 为 false 之后，并不意味着当前次的数据不能被写入了，但是我们应该告知数据的生产者，当前的消费速度已经跟不上生产速度了，所以这个时候，一般会将可读流的模式修改为暂停模式。
    5. 当数据生产者暂停之后，消费者会慢慢的消化内部缓存中的数据，直到可以再次被执行写入操作。
    6. 当缓冲区可以继续写入图数据时，如何让生产者知道？ drain 事件。
*/
let flag = ws.write("1");
console.log(flag);

flag = ws.write("1");
console.log(flag);

flag = ws.write("1");
console.log(flag);

ws.on('drain', () => {
  console.log(11)
})
