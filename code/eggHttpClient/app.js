module.exports = (app) => {
	app.beforeStart(async () => {
		// 示例：启动时去读取 https://registry.npmmirror.com/egg/latest 的版本信息
		const result = await app.curl('https://registry.npmmirror.com/egg/latest', {
			dataType: 'json'
		})
		app.logger.info('Egg 最新版本：%s', result.data.version)
	})
}
