const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('event1', () => {
    console.log('event1 被执行了')  // 此处会打印
})

myEvent.on('event1', () => {
    console.log('event1 也被执行了')  // 此处会打印
})

myEvent.emit('event1')