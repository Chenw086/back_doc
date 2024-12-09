const Service = require('egg').Service

module.exports = class extends Service {
	async findById() {
		const { ctx } = this
		return new Promise((r, j) => r({ id: 456 }))
	}
}
