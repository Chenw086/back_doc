module.exports = {
	seqConfig: {
		database: 'egg_mysql',
		username: 'root',
		password: 'w19950806.',
		host: 'localhost',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
		timezone: '+08:00'
	},
	redisConfig: {
		port: 6379,
		host: '127.0.0.1'
	}
}
