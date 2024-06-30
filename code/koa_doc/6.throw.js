// throw

const Koa = require('koa')
const http = require('http')
const Router = require('@koa/router')
const app = new Koa()

const router = new Router()

router
	.get('/', (ctx) => {
		const err = new Error('name required')
		err.status = 400
		err.expose = true
		throw err
	})
	.get('/test', (ctx) => {
		ctx.throw(400, 'chenwei')
	})

app.use(router.routes()).use(router.allowedMethods())

http.createServer(app.callback()).listen(3000)
