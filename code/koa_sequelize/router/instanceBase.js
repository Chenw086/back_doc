const Router = require('@koa/router')
const router = new Router()

router.get('/', async (ctx) => {
	const users = await ctx.model.InstanceBase.findAll({
		where: {
			name: ctx.query.name
		}
	})
	ctx.body = users
})

router.post('/', async (ctx) => {
	const user = await ctx.model.InstanceBase.build(ctx.request.body)
	user.set({
		cash: -30
	})
	console.log(123, user, user.toJSON()) // 一个将实例上所有内容打印，一个打印进存储进 sql 里面内容
	ctx.body = user

	// 简洁方法： await ctx.model.InstanceBase.create(ctx.request.body)
})

router.put('/', async (ctx) => {
	const user = await ctx.model.InstanceBase.findByPk(ctx.request.body.id)
	user.age = 30
	console.log(1, user.toJSON())
	await user.update({
		name: 'chenWei123'
	})
	console.log(2, user.toJSON())

	await user.save()
	ctx.body = user
})

router.delete('/', async (ctx) => {
	const state = await ctx.model.InstanceBase.findByPk(ctx.query.id)
	await state.destroy() // 从数据库删除
	ctx.body = '删除成功'
})

// 以下会创建两条数据
router.post('/section', async (ctx) => {
	const newData = await ctx.model.InstanceBase.create({ name: 'cw' })
	console.log(1, newData.name, newData.favoriteColor) // cw green

	newData.name = 'cw1'
	newData.favoriteColor = 'blue'
	await newData.save({ fields: ['name'] })
	console.log(2, newData.name) // cw1
	console.log(3, newData.favoriteColor) // blue
	await newData.reload() // 将数据库数据同步过来
	console.log(4, newData.name) // cw1
	console.log(5, newData.favoriteColor) // green

	ctx.body = '完成测试'
})

// 递增递减
router.post('/incr', async (ctx) => {
	const data = await ctx.model.InstanceBase.findByPk(ctx.request.body.id)
	await data.increment({
		age: 1,
		cash: -20
	})
	ctx.body = data
})

module.exports = router
