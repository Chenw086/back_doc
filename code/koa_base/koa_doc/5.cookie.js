// 上下文

const Koa = require('koa')
const http = require('http')
const Router = require('@koa/router')
const app = new Koa()

const router = new Router()

router
	.get('/', (ctx) => {
		ctx.cookies.set('test', 'chenwei')
    console.log(123)
		ctx.body = 'down'
	})
	.get('/test', (ctx) => {
		console.log(ctx.cookies.get('test'))
		ctx.body = 'down1'
	})

app.use(router.routes()).use(router.allowedMethods())

http.createServer(app.callback()).listen(3000)
