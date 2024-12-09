const Router = require('@koa/router')
const ioRouter = require('./ioRouter')

const indexRouter = new Router()


indexRouter.use('/io_start', ioRouter.routes())

module.exports = indexRouter
