const Router = require('@koa/router')
const modelTestController = require('../controller/modelTest')
const router = new Router()

module.exports = router

router.get('/', modelTestController.test)
