const http = require('http')

function sleepTime(time) {
    const sleep = Date.now() + time * 1000
    console.log(1111, sleep)
    while(Date.now() < sleep) {
        console.log(222222)
    }
    return
}
sleepTime(4)

const server = http.createServer((req, res) => {
    res.end('server')
})

server.listen(8080, () => {
    console.log('服务器已经启动')
})