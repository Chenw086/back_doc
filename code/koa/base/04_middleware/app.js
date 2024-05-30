/**
 *  - Koa 基础学习
 *
 *  - 中间件 - compose
 */
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const a1 = (ctx, next) => {
  console.log('a1')
  next()
}

const a2 = (ctx, next) => {
  console.log('a2')
  next()
}

const a3 = (ctx, next) => {
  console.log('a3')
  next()
}

app.use(compose([a1, a2, a3]))

app.listen(3000, () => {
  console.log('http://localhost:3000')
})

/* 
控制台打印：

  a1
  a2
  a3

*/
