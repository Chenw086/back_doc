const Controller = require('egg').Controller

module.exports = class extends Controller {
	async index() {
		const { ctx } = this
		const rules = {
			title: 'string',
			content: 'string'
		}
		try {
			ctx.validate(rules)
			ctx.body = ctx.request.body
		} catch (error) {
			error.message = '值不合法'
			error.code = '0'
			ctx.body = error
			ctx.status = 500
		}
	}
}
