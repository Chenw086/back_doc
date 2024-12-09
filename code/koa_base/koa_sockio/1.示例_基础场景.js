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
	socket.broadcast.emit('hi', '有新玩家接入') // 除了当前连接者，所有人都会收到

	// io.emit('hi', '有新玩家接入')  // 像所有玩家广播

	// 5 秒内没有发过去就报错
	socket.timeout(5000).emit('request', { foo: 'bar' }, 'baz', (err, response) => {
		if (err) {
			// the client did not acknowledge the event in the given delay
		} else {
			console.log(response.status) // 'ok'
		}
	})

	try {
		const response = await socket.timeout(5000).emitWithAck('request1', { name: 'chenwei' }, '111')
		console.log(response.status) // 'ok'
	} catch (e) {}

	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg)
		io.emit('chat message', msg)
	})

	socket.onAny((eventName, ...args) => {
		console.log('onAny')
		console.log(eventName) // 'hello'
		console.log(args) // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
	})
})

server.listen(3000, () => {
	console.log('Server is running on port 3000')
})
