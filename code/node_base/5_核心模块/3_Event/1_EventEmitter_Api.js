const EventEmitter = require('events')

const ev = new EventEmitter()

/*  
    on
*/
/* ev.on('事件1', (args) => {
    console.log('事件1执行了')
})

ev.on('事件1', (args) => {
    console.log('事件1执行了__2')
}) */

/*  
    emit
*/
/* ev.emit('事件1')  // 注册过的事件都会执行 */

/*  
    once
*/
/* ev.once('事件1', () => {
    console.log('事件1执行了')
})
ev.emit('事件1')
ev.emit('事件1')  // 只会执行一次 */

/*  
    off
*/
/* let fn = (a, b) => {
    console.log('事件1执行了', a, b)
}
ev.on('事件1', fn)
ev.emit('事件1', 1, 2)  // 会把参数传递过去， 对应以上的 ab
ev.off('事件1', fn)  // 移出了这个监听函数
ev.emit('事件1')  // 不会执行 */