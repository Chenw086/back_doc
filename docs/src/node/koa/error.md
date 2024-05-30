---
title: koa - 异常处理
---

# 异常处理

::: danger 提示
一定要将全局异常捕获代码写在最外层
:::

## throw 抛出异常响应

代码示例：

```js
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
```

## 全局异常捕获

注意，next 后面是异步代码，一定要加上 async await 否则不会进行捕获

```js
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
```

## 应用错误监听

全局监听与应用同时存在的时候，会执行全局，不会执行 app 监听

如果想 app 错误监听执行，需要手动 emit 过去

```js
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
```
