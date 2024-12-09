/**
 *  - Koa 基础学习
 *
 *  - koa 中错误处理
 */
const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  try {
    JSON.parse('asdhkjh')
    ctx.body = '正常过来'
  } catch (error) {
    console.log(error)
    // 第一种方法
    // ctx.status = 500
    // ctx.body = '服务端内部错误'

    // koa 内部还有一个方法
    ctx.throw(500)
  }
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
