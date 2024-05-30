/**
 *  - 处理 ctx.body
 */

const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const koa = require('./koa')

const app = new koa()

/**
 * 测试执行后面的是否能正常打印
 */

// app.use(async (ctx, next) => {
//   ctx.body = 'hello chenWei 1'
//   next()
// })

// app.use(async (ctx, next) => {
//   console.log(ctx.response.body)
// })

/**
 * 测试 body 结构
 */
app.use(async ctx => {
  // ctx.body = 'string'
  // ctx.body = 123
  // const data = await readFile('./package.json')
  // ctx.body = data
  // ctx.body = fs.createReadStream('./package.json')
  // ctx.body = { foo: 'body' }
  // ctx.body = [1, 2, 3]
  ctx.body = null
})

app.listen(3000)

// 最终输出的答案是：333
