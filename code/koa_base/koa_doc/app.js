// throw

const Koa = require('koa')
const http = require('http')
const Router = require('@koa/router')
const app = new Koa()
app.proxy = true

const router = new Router()

router
	.get('/', (ctx) => {
		ctx.status = 200
		ctx.set('ETag', '123')

		if (ctx.fresh) {
			ctx.status = 304
			return
		}

		ctx.body = '设置成功'
	})
	.get('/test', (ctx) => {
		ctx.redirect('http://gosdasdasdogle.com')
		// ctx.set('Cache-Control', 'no-cache')
		// ctx.type = 'text/plain; charset=utf-8'
		// ctx.append('Link', 'http://127.0.0.1')
		// ctx.append('Link', 'http://127.0.0.2')
		// ctx.body = ctx.type
	})

app.use(router.routes()).use(router.allowedMethods())

http.createServer(app.callback()).listen(3000)
