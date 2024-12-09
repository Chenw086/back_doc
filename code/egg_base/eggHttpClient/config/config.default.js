/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {})

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1716828868596_6870'

	// add your middleware config here
	config.middleware = []

	// 要关闭安全验证，否则 apiFox 都无法调试
	config.security = {
		csrf: {
			enable: false
		}
	}

	config.view = {
		mapping: {
			'.html': 'ejs'
		}
	}

	config.static = {
		prefix: ''
	}

	// 修改 session 配置
	config.session = {
		key: 'chen_test',
		maxAge: 60 * 1000, // 1 天
		httpOnly: true,
		encrypt: true,
		renew: true // 再次交互的时候刷新 session 时间
	}

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	}

	return {
		...config,
		...userConfig
	}
}
