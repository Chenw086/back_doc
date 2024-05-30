/**
 *  - Koa 基础学习
 *
 *  - koa 中错误处理
 */
const Koa = require('koa')
const fs = require('fs')
const utils = require('util')
const readFile = utils.promisify(fs.readFile)
const app = new Koa()

// 统一处理异常，这个代码应该卸载最外层
app.use(async (ctx, next) => {
  try {
    await next() // 进来就直接 next，有错误会回到这里来，在 catch 进行捕获
  } catch (error) {
    ctx.status = 500
    ctx.body = error.message
  }
})

app.use(async (ctx, next) => {
  // next() // 无法捕获后面的异步中间件
  // return next() // 可以捕获

  await next()
})

app.use(async ctx => {
  // 读取一个不存在的内容，报错后上层能捕获
  await readFile('./asdasd.png')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
