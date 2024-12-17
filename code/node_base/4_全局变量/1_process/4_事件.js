/*
    监听退出的事件
    以下打印顺序：
        代码执行完毕
        beforeExit0
        exit0
*/
process.on("exit", (code) => {
  // 这里面只能执行同步的代码
  console.log("exit" + code);
});
process.on("beforeExit", (code) => {
  // 这里面可以写异步代码
  console.log("beforeExit" + code);
  setTimeout(() => {
    console.log("异步的代码"); // 这里的代码会循环执行
  }, 1000);
});
console.log("代码执行完毕");

/*  
    手动退出，不会执行后续的代码
    打印台：
        代码执行完毕
        exit0
*/
// process.exit()
// console.log('代码执行完了111')
