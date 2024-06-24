const ioredis = require('ioredis')

// 1. 建立连接

const redis = new ioredis({
	port: '6379',
	host: 'localhost',
	showFriendlyErrorStack: true
})

async function main() {
	try {
		const ret = await redis.multi().set('chen', 100).set('luan', 200).exec()
		console.log(ret)
	} catch (error) {
		console.log(error)
	}
}

main()
