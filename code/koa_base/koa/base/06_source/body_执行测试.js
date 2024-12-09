/**
 *  - 处理 ctx.body
 */

const koa = require('koa')

const app = new koa()

app.use(async (ctx, next) => {
  ctx.body = '111'
  await next()
  ctx.body = '333'
})

app.use(async (ctx, next) => {
  ctx.body = '222'
})

app.listen(3000)

// 最终输出的答案是：333
