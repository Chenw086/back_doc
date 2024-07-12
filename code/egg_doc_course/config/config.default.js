module.exports = (appInfo) => {
	const config = {}
	config.keys = 'cookie.key'
	config.security = {
		csrf: { enable: false }
	}
	config.multipart = {
		mode: 'stream',
		fileSize: '50mb'
	}

	config.mysql = {
		// 单数据库信息配置
		client: {
			// host
			host: 'localhost',
			// 端口号
			port: '3306',
			// 用户名
			user: 'root',
			// 密码
			password: 'w19950806.',
			// 数据库名
			database: 'egg_mysql'
		},
		// 是否加载到 app 上，默认开启
		app: true,
		// 是否加载到 agent 上，默认关闭
		agent: false
	}

	config.sequelize = {
		dialect: 'mysql',
		host: '127.0.0.1',
		port: 3306,
		database: 'egg_mysql',
		username: 'root',
		password: 'w19950806.'
	}

	return {
		...config
	}
}
