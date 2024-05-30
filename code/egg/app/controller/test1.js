const { Controller } = require('egg')

class Test2Controller extends Controller {
  async index() {
    const { ctx, app } = this
    const token = ctx.request.token

    ctx.body = {
      status: 200,
      body: token,
      req: ctx.request,
    }
  }
}

module.exports = Test2Controller
