const fs = require('fs')
const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super()
        this.path = path
        this.flags = options.flags || 'r'
        this.mode = options.mode || 438
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.end = options.end
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.readOffset = 0

        this.open()

        /* 监听新的事件的时候会被触发 */
        this.on('newListener', type => {
            if(type === 'data') {
                this.read()
            }
        })
    }

    /**
     * 原生 open 方法，打开指定位置上的文件
     * 此处的 open 是异步的，所以即使触发错误在前，绑定 error 事件在后，也能触发事件
     */
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if(err) {
                this.emit('error', err)
                return 
            }
            this.fd = fd
            this.emit('open', fd)
        })
    }

    /**
     *  没有拿到 fd 的时候就进入监听 open，open 事件 emit 的时候，就肯定会拿到，随之触发 read。
     *  读取文件存到 buf 里面，有数据的时候就通过 emit data，把数据返还出去
     */
    read() {
        if(typeof this.fd !== 'number') {
            return this.once('open', this.read)
        } 

        let buf = Buffer.alloc(this.highWaterMark)

        /*  
            如果读取的剩余数据大于 highWaterMark, 就使用 highWaterMark
        */
        let howMuchToRead
        if(this.end) {
            howMuchToRead = Math.min(this.end - this.readOffset + 1, this.highWaterMark)
        } else {
            howMuchToRead = this.highWaterMark
        }

        fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
            if(readBytes) {  // 没有数据的时候就是 0
                this.readOffset += readBytes
                this.emit('data', buf.slice(0, readBytes))
                this.read()
            } else {
                this.emit('end')
                this.close()
            }
        })
    }

    close() {
        fs.close(this.fd, () => {
            this.emit('close')
        })
    }
}

let rs = new MyFileReadStream('test.txt', {
    highWaterMark: 3,
    end: 7
})

/* rs.on('open', fd => {
    console.log('open', fd)  // open 3
}) */

rs.on('error', err => {
    console.log(err)
})

rs.on('data', chunk => {
    console.log(chunk.toString())
})

rs.on('end', () => {
    console.log('end')
})

rs.on('close', () => {
    console.log('close')
})