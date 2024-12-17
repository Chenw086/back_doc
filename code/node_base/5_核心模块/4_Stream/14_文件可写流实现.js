const fs = require("fs");
const EventsEmitter = require("events");
const Queue = require("./13_单向链表实现队列");

class MyWriteStream extends EventsEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "w";
    this.mode = options.mode || 438;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.encoding = options.encoding || "utf8";
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.writeOffset = this.start;
    this.writing = false;
    this.writLen = 0;
    this.needDrain = false;
    this.cache = new Queue();

    this.open();
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.emit("error", err);
      }
      // 正常打开文件
      this.fd = fd;
      this.emit("open", fd);
    });
  }

  /**
   *
   * @param {Buffer | string } chunk
   * @param { string } encoding
   * @param { () => void } cb
   * @returns { boolean }
   */
  write(chunk, encoding, cb) {
    // 进入判断类型,转换成 Buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);

    // 已经写入到 chunk 里面的长度,  与 highWaterMark 对比,超过则把数据往缓存区放
    let len = chunk.length;
    this.writLen += len;
    let flag = this.writLen < this.highWaterMark;
    this.needDrain = !flag;

    if (this.writing) {
      // 当前正在执行写入,所以内容应该排队
      this.cache.enQueue({
        chunk,
        encoding,
        cb,
      });
    } else {
      // 当前不是正在写入,那么就执行写入
      this.writing = true;
      this._write(chunk, encoding, () => {
        cb();
        // 清空排队的内容
      });
    }
    return flag;
  }

  /**
   * 写入操作，如果没有取到 fd 则再包一层。
   * 调用 fs 写入数据，写入完毕重置 writeOffset 与 writLen
   * 执行传入回调，拿去队列中的数据执行
   * @param { Buffer } chunk
   * @param { string } encoding
   * @param { () => void } cb
   * @returns { void }
   */
  _write(chunk, encoding, cb) {
    if (typeof this.fd !== "number") {
      return this.once("open", () => {
        return this._write(chunk, encoding, cb);
      });
    }
    fs.write(
      this.fd,
      chunk,
      this.start,
      chunk.length,
      this.writeOffset,
      (err, written) => {
        this.writeOffset += written;
        this.writLen -= written;

        cb && cb();
        this._clearBuffer();
      }
    );
  }

  /**
   * 拿到队列中第一个数据。
   * 如果有数据：
   *  那么就调用写入操作
   * 如果没有数据
   *  就将 needDrain 重置为 false，发送 drain 事件
   *  needDrain 变量存在的意义就是不要反反复复的发送 drain 事件
   */
  _clearBuffer() {
    let data = this.cache.deQueue();
    if (data) {
      this._write(data.element.chunk, data.element.encoding, () => {
        data.element.cb && data.element.cb();
        // this._clearBuffer();
      });
    } else {
      if (this.needDrain) {
        this.needDrain = false;
        this.emit("drain");
      }
    }
  }
}

const ws = new MyWriteStream("./test3.txt", {
  highWaterMark: 1,
});
ws.on("open", (fd) => {
  console.log("open ------>", fd);
});
ws.write("1", "utf8", () => {
  console.log("走到这里了");
});

ws.write("10", "utf8", () => {
  console.log("走到这里了");
});

ws.write("陈伟跑通了没有", "utf8", () => {
  console.log("走到这里了");
});

ws.on("drain", () => {
  console.log("drain 事件被触发了");
});
