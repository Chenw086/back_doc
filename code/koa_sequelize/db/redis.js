const Redis = require('ioredis')
const { redisConfig } = require('../config/config.default')

const redis = new Redis({
	port: redisConfig.port,
	host: redisConfig.host
})

module.exports = redis
