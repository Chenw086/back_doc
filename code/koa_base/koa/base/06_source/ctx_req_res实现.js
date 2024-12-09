/**
 * koa context 将 node 的 request 和 response 对象封装到单个对象中
 *    为编写 web 程序和 api 提供了许多有用的方法
 *
 * 每个请求都创建一个 context，并在中间件中作为参数引用
 *
 * ctx.req - Node 的 request 对象
 * ctx.res - Node 的 response 对象
 *
 * ctx.request - koa 中封装的请求对象
 * ctx.response - koa 中封装的响应对象
 *
 * request 别名
 * ctx.header
 * ctx.url
 * ctx.method ... 等等
 * 其余的看官方文档
 *
 * 同理 response
 */

const Koa = require('./koa/lib/application')

const app = new Koa()

const one = (ctx, next) => {
  console.log('1 --> one', ctx.request.method, ctx.method)
  next()
  console.log('1 <-- one')
}

const two = (ctx, next) => {
  console.log('2 --> two')
  next()
  console.log('2 <-- two')
}

const three = (ctx, next) => {
  console.log('3 --> three')
  next()
  console.log('3 <-- three')
}

app.use(one)
app.use(two)
app.use(three)

// console.log(app.middleware)

app.listen(3000)
