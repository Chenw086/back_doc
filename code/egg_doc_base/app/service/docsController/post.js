const Service = require('egg').Service

class UserService extends Service {
	async create(req) {
		return await new Promise((r, j) => {
			r({ id: 456 })
		})
	}
}
module.exports = UserService
