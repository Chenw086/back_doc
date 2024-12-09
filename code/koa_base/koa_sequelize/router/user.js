const Router = require('@koa/router')
const router = new Router()

router.get('/', async (ctx) => {
	const users = await ctx.model.User.findAll()
	ctx.body = users
})

router.post('/', async (ctx) => {
	const user = await ctx.model.User.create(ctx.request.body)
	ctx.body = user
})

router.put('/', async (ctx) => {
	const user = await ctx.model.User.findByPk(ctx.request.body.id)
	await user.update({
		firstName: ctx.request.body.firstName
	})
	await user.save()
	ctx.body = user
})

router.delete('/', async (ctx) => {
	const state = await ctx.model.User.drop()
	ctx.body = state
})

router.get('/get_name', async (ctx) => {
	const user = await ctx.model.User.findByPk(ctx.request.query.id)
	ctx.body = user.getFullName()
})

module.exports = router
