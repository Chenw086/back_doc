---
title: koa - 静态资源托管
---

# 静态资源托管

::: info
🤩 静态托管插件地址：[koa-static](https://github.com/koajs/static)

😂 挂载中间件：[koa-mount](https://github.com/koajs/mount)

- 效果类似于 express 的虚拟路径
  :::

```js
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
```

应用或者路由的挂载也是用的这个 mount 插件

效果与 express 类似，不同点在于 ctx，具体的配置参考 github 文档
