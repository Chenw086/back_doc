const modelTestService = require('../service/modelTest')
module.exports = {
	async test(ctx) {
    ctx.body = await modelTestService.test(ctx)
  }
}
