const Koa = require('koa')
const path = require('path')
const http = require('http')
const parameter = require('koa-parameter')
const views = require('koa-views')
const { bodyParser } = require('@koa/bodyparser')
const static = require('koa-static')
const sequelize = require('./db/seq')
const router = require('./router')
const initSocketIo = require('./plugin/socketIo/start/start')

require('./utils/sync')

const app = new Koa()

app.use(static(path.join(__dirname, 'public')))

const render = views(__dirname + '/views', {
	map: {
		html: 'ejs'
	},
	extension: 'html'
})

app.use(render)

parameter(app)

app.use(async (ctx, next) => {
	ctx.model = sequelize.models
	await next()
})
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

const server = http.createServer(app.callback())

// 初始化 socketIo
initSocketIo(server)

server.listen(3000, () => {
	console.log('Server is running on port 3000')
})
