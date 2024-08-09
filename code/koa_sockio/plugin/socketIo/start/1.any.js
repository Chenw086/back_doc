/**
 * 此文件介绍，通用数据的监听
 */



const { Server } = require('socket.io')

module.exports = (server) => {
	const io = new Server(server, {
		connectionStateRecovery: {}
	})
	io.on('connection', async (socket) => {
		console.log('a user connected')

		io.emit('hi', '有新玩家接入') // 像所有玩家广播

    // 通用监听器
		socket.onAny((eventName, ...args) => {
			console.log(eventName, 123) // 'hello'
			console.log(args, 456) // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
		})

		socket.on('msg', (msg) => io.emit('hi', msg))

		socket.on('disconnect', () => {
			console.log('与服务器断开连接')
		})
	})
}
