/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const counter = app.middleware.counter()
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/chenWei', controller.home.chenWei)

  // 新增的控制器
  router.get('/chen', counter, controller.chen.index)
  router.get('/test', controller.chen.chenTest)

  // 传参模式
  router.get('/testQuery', controller.chen.testQuery) // 打印： {"age":"123"}
  router.get('/testParams/:name/:age', controller.chen.testParams) // 如果不传递其中一个，那么就会返回 404 页面

  router.post('/testPost', controller.chen.testPost)

  // cookie 学习
  router.post('/add', controller.chen.add)
  router.post('/del', controller.chen.del)
  router.post('/edit', controller.chen.edit)
  router.post('/show', controller.chen.show)

  router.get('/newContext', controller.chen.newContext)

  // res req 的扩展
  router.post('/reqResExtend', controller.test1.index)
  router.post('/resExtend', controller.test1.newResponse)
}
