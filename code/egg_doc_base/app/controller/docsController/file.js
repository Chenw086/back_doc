// app/controller/upload.js
const Controller = require('egg').Controller
const path = require('path')
const fs = require('fs')
const stream = require('stream')
const util = require('util')
const { randomUUID } = require('crypto')
const pipeline = util.promisify(stream.pipeline)

module.exports = class extends Controller {
	async upload() {
		const { ctx } = this
		const file = ctx.request.files[0]
		console.log(ctx.request.files, ctx.request.body) // 文件就在files 里面，非文件的内容就在 body 里面
		const targetDir = path.join(this.config.baseDir, 'public', 'egg-multipart-test')
		const name = path.basename(file.filename)
		const target = path.join(targetDir, name)
		if (!fs.existsSync(targetDir)) {
			fs.mkdirSync(targetDir, { recursive: true })
		}
		const readStream = fs.createReadStream(file.filepath)
		const writeStream = fs.createWriteStream(target)
		readStream.pipe(writeStream)
		return new Promise((r, j) => {
			writeStream.on('finish', () => {
				ctx.status = 200
				ctx.body = {
					name,
					target,
					targetDir
				}
				ctx.cleanupRequestFiles()
				r()
			})
		})
	}

	async stream() {
		const { ctx, config } = this
		const parts = this.ctx.multipart()
		for await (const part of parts) {
			if (Array.isArray(part)) {
				// fields 流模式的时候，非文件内容在这里
				console.log('body: ', part)
				console.log('field: ' + part[0])
				console.log('value: ' + part[1])
			} else {
				// otherwise, it's a stream  文件流的内容在这里
				const { filename, fieldname, encoding, mime } = part

				console.log('field: ' + fieldname)
				console.log('filename: ' + filename)
				console.log('encoding: ' + encoding)
				console.log('mime: ' + mime)

				const targetPath = path.join(config.baseDir, 'public', fieldname + path.extname(filename))
				await pipeline(part, fs.createWriteStream(targetPath)) // use `pipeline` not `pipe`
			}
		}
		ctx.body = 'success'
	}
}
