// listen

const Koa = require('koa')
const http = require('http')
const app = new Koa()

app.context.chen = 'wei'

app.use(async (ctx) => {
	console.log(ctx.chen) // wei
	ctx.body = 'Hello World'
})

http.createServer(app.callback()).listen(3000)
