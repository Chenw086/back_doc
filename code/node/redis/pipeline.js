const ioredis = require('ioredis')

// 多条命令的时候统一提交 exec 才会提交给 redis 服务器，效率更高

// 1. 建立连接
const redisIo = new ioredis({
	port: 6379,
	host: 'localhost'
})

async function main() {
	try {
		const pipeline = redisIo.pipeline()
		for (let i = 0; i < 100; i++) {
			pipeline.set(`${i}--foo`, i)
		}
		const res = await pipeline.exec()
		console.log(res)
	} catch (error) {
		console.log('操作失败', err)
	}
}

main()
