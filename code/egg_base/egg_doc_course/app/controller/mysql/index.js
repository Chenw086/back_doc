module.exports = class extends require('egg').Controller {
	async test() {
		const data = await this.app.mysql.query('SHOW databases')
		console.log(data, 11111)
		this.ctx.body = data
	}
}
