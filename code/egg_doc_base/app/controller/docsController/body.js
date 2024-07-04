const assert = require('assert')
const Controller = require('egg').Controller

class BodyController extends Controller {
	async listPosts() {
		assert.equal(this.ctx.request.body.title, 'controller')
		assert.equal(this.ctx.request.body.content, 'what is controller')
		this.ctx.body = this.ctx.request.body
	}
}

module.exports = BodyController
