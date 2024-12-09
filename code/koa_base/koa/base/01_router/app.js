/**
 *  - 使用 Koa 启动一个 http 服务
 *
 *  - Koa 没有路由系统，只有中间件功能
 */
const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.get('/', ctx => {
  ctx.body = 'home page'
})

router.post('/', ctx => (ctx.body = 'post /'))

router.get('/foo', ctx => (ctx.body = 'foo page'))

router.get('/users/:id', ctx => {
  console.log(ctx.params) // 如果请求 /users/123 打印： { id: '123' }
  ctx.body = 'users page'
})

app.use(router.routes()).use(router.allowedMethods())

/**
 * - 以下是基础功能的尝试
 */
// app.use(ctx => {
//   // console.log('查看请求头', ctx.headers)
//   // console.log('查看主机名', ctx.hostname)
//   // console.log('查看主机', ctx.host)
//   // ctx.body = 'hello world'

//   console.log('查看地址', ctx.path) // http://localhost:3000/abc 就是 /abc
//   const path = ctx.path
//   if (path === '/') {
//     ctx.body = 'home page'
//   } else if (path === 'foo') {
//     ctx.body = 'foo page'
//   } else {
//     ctx.body = '404 NOT FOUND'
//   }
// })

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
