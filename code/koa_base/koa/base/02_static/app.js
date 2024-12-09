/**
 *  - Koa 基础学习
 *
 *  - 静态资源托管
 */
const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const mount = require('koa-mount')

const app = new Koa()
// app.use(static(path.join(__dirname, './static'))) // 不要写相对路径，以免产生意想不到的结果

// 如果想设定虚拟路径，就需要用到 mount
app.use(mount('/mount', static(path.join(__dirname, './static')))) // 这样设定了以后，下次请求就用 /mount/main.css 来请求拿到 main.css 静态资源

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
