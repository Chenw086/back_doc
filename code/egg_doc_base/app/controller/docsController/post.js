const Controller = require('egg').Controller

class PostController extends Controller {
	async create() {
		const { ctx, service } = this
		const createRule = {
			title: { type: 'string' },
			content: { type: 'string' }
		}
		// 校验参数
		try {
			ctx.validate(createRule)
		} catch (error) {
			this.logger.info(error)
			ctx.status = 500
			ctx.body = error
			return
		}
		// 组装参数
		const author = ctx.session.userId || '123'
		const req = Object.assign(ctx.request.body, { author })
		// 调用 Service 进行业务处理
		const res = await service.docsController.post.create(req)
		// 设置响应内容和响应状态码
		ctx.body = { id: res.id }
		ctx.status = 201
	}
}
module.exports = PostController
