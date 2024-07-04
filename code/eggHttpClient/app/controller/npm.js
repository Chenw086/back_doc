const Controller = require('egg').Controller

class NpmController extends Controller {
	async index() {
		const ctx = this.ctx

		// 示例：请求一个 npm 模块信息
		const result = await ctx.curl('https://registry.npmmirror.com/egg/latest', {
			// 自动解析 JSON 响应
			dataType: 'json',
			// 3 秒超时
			timeout: 3000
		})

		ctx.body = {
			status: result.status,
			headers: result.headers,
			package: result.data
		}
	}
}

module.exports = NpmController
