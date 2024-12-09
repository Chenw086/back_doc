module.exports = class extends require('egg').Controller {
	async test() {
		this.ctx.body = this.app.getBaseDir()
	}
	async ctxTest() {
		console.log(this.ctx.getBaseDir)
		this.ctx.body = this.ctx.getBaseDir
	}

	async requestTest() {
		this.ctx.body = this.ctx.request.requestTest
	}

	async responseTest() {
		this.ctx.response.foo = '123'
		this.ctx.body = 'success'
	}

	async helperTest() {
		this.ctx.body = this.ctx.helper.change('abc')
	}
}
