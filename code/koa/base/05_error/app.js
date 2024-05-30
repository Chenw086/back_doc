/**
 *  - Koa 基础学习
 *
 *  - koa 中错误处理：error 捕获
 */
const Koa = require('koa')
const fs = require('fs')
const utils = require('util')
const { error } = require('console')
const readFile = utils.promisify(fs.readFile)
const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = 500
    ctx.body = error.message
    console.log(2)

    // ctx.app.emit('error', error, ctx) // 不这样写的话，应用的错误捕获不会执行
  }
})

app.use(async (ctx, next) => {
  ctx.app.emit('error', new Error('发生错误'), ctx) // 此处这样写，会执行最外层异常捕获，也会执行 app 监听捕获
  console.log(1)

  await next()
})

app.use(async ctx => {
  await readFile('./a.png')
})

// 与全局异常捕获同时存在的时候，不会执行
// 如果想这里执行，需要 ctx.app.emit 执行 error 监听
app.on('error', err => {
  console.log('app error', '3', err)
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})

/**
 * 打印顺序： 3 1 2
 */
