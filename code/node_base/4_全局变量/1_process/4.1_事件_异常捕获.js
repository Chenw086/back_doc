// 当一个未被捕获的异常抛出时，会触发该事件。下面通过一个简单的例子来说明 uncaughtException 事件的使用
process.on("uncaughtException", (err, origin) => {
  console.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
setTimeout(() => {
  console.log("This will still run.");
}, 500);
// 故意引发一个未被捕获的异常
nonexistentFunc();
console.log("This will not run.");
