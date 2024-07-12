const Router = require('@koa/router')
const userRouter = require('./user')
const instanceRouter = require('./instanceBase')

const indexRouter = new Router()

indexRouter.use('/user', userRouter.routes())
indexRouter.use('/instance_base', instanceRouter.routes())

module.exports = indexRouter
