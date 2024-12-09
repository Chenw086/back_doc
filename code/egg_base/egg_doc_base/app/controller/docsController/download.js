const Controller = require('egg').Controller
const fs = require('fs')
const path = require('path')

module.exports = class extends Controller {
	async index() {
		const { ctx } = this
		const filePath = path.join(this.app.config.baseDir, 'public/mysql_stream.jpg')
		const fileName = 'downloadTest'

		try {
			// 记录这里的一个问题，之前的写法：
			// https://blog.csdn.net/tinfengyee/article/details/105031452
			/*
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                ctx.status = 404;
                ctx.body = '文件不存在';
                return;
            }
            ctx.set('Content-Type', 'application/octet-stream');
            ctx.set('Content-Disposition', `attachment;filename=${fileName}`);
            // 由于 fs.access 是异步的，必须在回调中设置 ctx.body
            ctx.body = fs.createReadStream(filePath);
        });
      */

			// 这种写法导致：永远返回：404 not found
			// 原因：原因在于 fs.access 是异步回调函数，而 Egg.js 的 Controller 是基于 async/await 进行异步处理的。由于 fs.access 的回调函数是在异步操作完成后执行的，它可能会在请求处理完成后再执行，从而导致上下文（ctx）已经不可用或请求已经结束
			await fs.promises.access(filePath, fs.constants.F_OK)

			ctx.set('Content-Type', 'application/octet-stream')
			ctx.set('Content-Disposition', `attachment; filename=${fileName}`)
			ctx.body = fs.createReadStream(filePath)
		} catch (err) {
			ctx.status = 404
			ctx.body = '文件不存在'
		}
		this.logger.info('test') // 2024-07-04 20:00:18,754 INFO 10140 [controller.docsController.download] test
	}
}
