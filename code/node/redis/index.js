const ioredis = require('ioredis')

// 1. 建立连接
const redis = new ioredis({
	port: 6379,
	host: 'localhost'
})

// 操作 redis
// redis.set('foo', 'bar', (err, res) => {
// 	if (err) return console.lof('写入失败', err)

// 	console.log('写入成功', res)
// })

// redis.get('foo', (err, res) => {
// 	if (err) return console.lof('读取失败', err)

// 	console.log('读取成功', res)
// })

redis
	.get('foo')
	.then((res) => console.log(res))
	.catch((err) => console.log(err))
