setTimeout(() => {
    console.log('timeout')   
}, 0)  // 不传时间的时候此处为 0

setImmediate(() => {
    console.log('immediate')
})

/*  
    有时候先打印 timeout， 有时候先打印 immediate
    因为：有时候 settimeout 会延时执行，所以先执行 immediate
*/

fs.readFile('./1_browser_eventloop.js', () => {
    setTimeout(() => {
        console.log('timeout')   
    }, 0)  // 不传时间的时候此处为 0
    
    setImmediate(() => {
        console.log('immediate')
    })
})

/*  
    以上永远先执行 immediate 然后执行 setTimeout
    因为：代码执行是在 poll 里面的， poll 执行完毕切换的时候会先执行 check，所以顺序是固定的
*/