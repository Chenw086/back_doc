/*  
    模拟事件对象的实现
*/

class PubSub {
  constructor() {
    this._event = {};
  }

  // 注册
  subscribe(event, callback) {
    if (this._event[event]) {
      // 如果 event 存在， 所以只需要往后添加当前监听操作
      this._event[event].push(callback);
    } else {
      this._event[event] = [callback];
    }
  }

  // 发布
  publish(event, ...args) {
    const items = this._event[event];
    if (items && items.length) {
      items.forEach(function (callback) {
        callback.call(this, ...args);
      });
    }
  }
}

let ps = new PubSub();
ps.subscribe("事件1", function () {
  console.log("事件1执行了");
});
ps.publish("事件1");
