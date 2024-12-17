/*  
    eventEmitter 的模拟
*/
function MyEvent() {
  // 准备一个数据结构用于缓存订阅者信息
  this._event = Object.create(null);
}

MyEvent.prototype.on = function (type, callback) {
  // 判断当前次的事件是否已经存在，然后再决定如何做缓存
  if (this._event[type]) {
    this._event[type].push(callback);
  } else {
    this._event[type] = [callback];
  }
};

MyEvent.prototype.emit = function (type, ...args) {
  if (this._event && this._event[type].length) {
    this._event[type].forEach((callback) => {
      callback.call(this, ...args);
    });
  }
};

MyEvent.prototype.off = function (type, callback) {
  // 判断当前 type 事件监听是否存在，如果存在则取消指定监听
  if (this._event && this._event[type]) {
    this._event[type] = this._event[type].filter((item) => {
      return item !== callback && item.link !== callback;
    });
  }
};

MyEvent.prototype.once = function (type, callback) {
  let foo = function (...args) {
    callback.call(this, ...args);
    this.off(type, foo);
  };
  // 区别哪些不是 once 绑定的
  foo.link = callback;
  this.on(type, foo);
};

let ev = new MyEvent();
let fn = function (...data) {
  console.log("事件1执行了", data);
};

ev.on("事件1", fn);
ev.on("事件1", () => {
  console.log("事件1再次执行");
});
ev.emit("事件1", 1, 2);
ev.off("事件1", fn);
ev.emit("事件1");

ev.once("事件2", fn);
ev.emit("事件2");
ev.emit("事件2"); // 只执行一次

/*  
    效果没有移除的事件监听会执行两次，不会执行第二次。
*/
