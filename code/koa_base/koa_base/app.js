const Koa = require('koa')
const { bodyParser } = require('@koa/bodyparser')
const router = require('./router')
const sequelize = require('./db/seq')
const parameter = require('koa-parameter')
require('./utils/sync')

const app = new Koa()
parameter(app)
app.use(async (ctx, next) => {
	ctx.model = sequelize.models
	await next()
})
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8081, () => {
	console.log('Server is running on port 8081')
})
