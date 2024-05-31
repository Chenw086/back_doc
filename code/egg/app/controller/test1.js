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

  async newResponse() {
    const { ctx} = this
    ctx.response.token = 'chenWei0806'

    const testBase64 = ctx.helper.base64Encode('chenW')

    ctx.body = testBase64
  }
}

module.exports = Test2Controller
