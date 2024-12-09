const assert = require('assert')

const Controller = require('egg').Controller

class QueryController extends Controller {
	async query() {
		const { ctx } = this
		this.logger.info(ctx.query, __filename)
		ctx.body = ctx.query
	}

	async param() {
		try {
			assert.equal(this.ctx.params.projectId, '1')
			assert.equal(this.ctx.params.appId, '2')
		} catch (error) {
			this.logger.info(error)
			this.ctx.status = 500
			this.ctx.body = error
			return
		}
		this.ctx.body = this.ctx.params
	}
}

module.exports = QueryController
