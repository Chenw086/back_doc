const Controller = require('egg').Controller

module.exports = class extends Controller {
	async getUser() {
		const { ctx } = this
		const userInfo = await ctx.service.docsService.user.findById(123)
		ctx.body = userInfo
	}
}
