const Router = require('@koa/router')
const userRouter = require('./user')
const instanceRouter = require('./instanceBase')
const selectBase = require('./selectBase')
const modelTest = require('./modelTest')

const indexRouter = new Router()

indexRouter.use('/user', userRouter.routes())
indexRouter.use('/instance_base', instanceRouter.routes())
indexRouter.use('/select_base', selectBase.routes())
indexRouter.use('/model_test', modelTest.routes())

module.exports = indexRouter
