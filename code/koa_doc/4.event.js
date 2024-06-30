// 上下文

const Koa = require('koa')
const http = require('http')
const app = new Koa()

app.use(async (ctx) => {
	ctx.app.emit('test', 123)
	ctx.body = 123
})

app.on('test', (val) => console.log(val))

http.createServer(app.callback()).listen(3000)
