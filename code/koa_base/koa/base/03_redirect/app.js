/**
 *  - Koa 基础学习
 *
 *  - 静态资源托管
 */
const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.get('/foo', ctx => (ctx.body = '/foo'))

router.get('/redirect', ctx => ctx.redirect('/foo'))

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
