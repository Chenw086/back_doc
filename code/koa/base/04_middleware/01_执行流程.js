/**
 *  - Koa 基础学习
 *
 *  - 中间件
 */
const Koa = require('koa')
const fs = require('fs')
const utils = require('util')
const app = new Koa()

app.use(async (ctx, next) => {
  const data = await utils.promisify(fs.readFile)('./views/index.html')
  ctx.type = 'html' // 不写这一行，浏览器会当做下载内容
  ctx.body = data
  next()
})

const one = (ctx, next) => {
  console.log('1 -- one')
  next() // 如果注释掉这里的 next 不会进入到后面的中间件，控制台也只会打印： 1 2 one
  console.log('2 -- one')
}

const two = (ctx, next) => {
  console.log('1 -- two')
  next()
  console.log('2 -- two')
}

const three = (ctx, next) => {
  console.log('1 -- three')
  next()
  console.log('2 -- three')
}

app.use(one).use(two).use(three)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})

/* 
执行结果：
  1 -- one
  1 -- two
  1 -- three
  2 -- three
  2 -- two
  2 -- one
*/
