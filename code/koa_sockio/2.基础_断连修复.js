const Koa = require('koa')
const path = require('path')
const http = require('http')
const parameter = require('koa-parameter')
const { Server } = require('socket.io')
const views = require('koa-views')
const { bodyParser } = require('@koa/bodyparser')
const static = require('koa-static')
const sequelize = require('./db/seq')
const router = require('./router')

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
const io = new Server(server, {
	connectionStateRecovery: {}
})
io.on('connection', async (socket) => {
	console.log('a user connected')

	io.emit('hi', '有新玩家接入') // 像所有玩家广播

	socket.on('msg', (msg) => io.emit('hi', msg))

	socket.on('disconnect', () => {
		console.log('与服务器断开连接');
	});
})

server.listen(3000, () => {
	console.log('Server is running on port 3000')
})
