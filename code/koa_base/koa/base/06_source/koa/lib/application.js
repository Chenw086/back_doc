const http = require('http')
const context = require('./context.js')
const request = require('./request.js')
const response = require('./response.js')
const { Stream } = require('stream')

class Application {
  constructor() {
    this.middleware = [] // 保存用户添加的中间件

    // 这样写的意义是以免污染，也挂载在了示例上面
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }

  listen(...args) {
    const server = http.createServer(this.callback())

    server.listen(...args)
  }

  use(fn) {
    this.middleware.push(fn)
  }

  // 异步递归遍历调用中间件处理函数
  compose(middleware) {
    return function (context) {
      const dispatch = index => {
        if (index >= middleware.length) return Promise.resolve()
        const fn = middleware[index]

        // () => dispatch(index + 1) 就是 next 函数
        return Promise.resolve(fn(context, () => dispatch(index + 1)))
      }

      // 返回第一个中间件函数
      return dispatch(0)
    }
  }

  createContext(req, res) {
    // 一个实例会处理多个请求，而不同的请求应该拥有不同的上下文对象，为了避免请求期间的数据交叉污染，所以这里又对这个数据做了一份新的拷贝
    const context = Object.create(this.context)
    const request = (context.request = Object.create(this.request))
    const response = (context.response = Object.create(this.response))

    context.app = request.app = response.app = this
    context.req = request.req = response.req = req
    context.res = request.res = response.res = res

    request.ctx = response.ctx = context
    request.response = response
    response.request = request

    context.originalUrl = request.originalUrl = req.url

    context.state = {}

    return context
  }

  callback() {
    const fnMiddleware = this.compose(this.middleware)
    const handleRequest = (req, res) => {
      // 每个 context 都会创建一个 context 上下文对象，他们之间不会互相污染
      const context = this.createContext(req, res)

      fnMiddleware(context)
        .then(() => {
          console.log('end')
          // res.end('my koa')
          // res.end(context.body)
          respond(context)
        })
        .catch(err => {
          console.log('err', err)
          res.end(err.message)
        })
    }

    return handleRequest
  }
}

function respond(ctx) {
  const body = ctx.body
  const res = ctx.res

  if (body === null) {
    res.statusCode = 204
    return res.end()
  }

  if (typeof body === 'string') return res.end(body)
  if (Buffer.isBuffer(body)) return res.end(body)
  if (body instanceof Stream) return body.pipe(ctx.res)
  if (typeof body === 'number') return res.end(body + '')
  if (typeof body === 'object') {
    const jsonStr = JSON.stringify(body)
    return res.end(jsonStr)
  }
}

module.exports = Application
