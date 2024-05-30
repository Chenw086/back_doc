---
title: egg - GET、POST 与传参
---

# GET、POST 与传参

::: danger 说明

事实上大部分的请求都只分两类：GET POST 类型

参数传递方式:

1. 自由传参
2. 严格传参

:::

## GET 与传参

```js {18-29}
const { Controller } = require('egg')

class ChenController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = '你好，我是陈伟'
  }

  async chenTest() {
    const { ctx } = this
    await new Promise(resolve => {
      setTimeout(() => {
        resolve((ctx.body = 'chenTest'))
      }, 5000)
    })
  }

  // 自由传参模式
  async testQuery() {
    const { ctx } = this
    ctx.body = ctx.query
  }

  // 严格传参模式
  async testParams() {
    const { ctx } = this
    ctx.body = `你好，${ctx.params.name}, 你今年 ${ctx.params.age} 岁吗`
  }
}

module.exports = ChenController
```

```js {13-15}
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/chenWei', controller.home.chenWei)

  // 新增的控制器
  router.get('/chen', controller.chen.index)
  router.get('/test', controller.chen.chenTest)

  // 传参模式
  router.get('/testQuery', controller.chen.testQuery) // 打印： {"age":"123"}
  router.get('/testParams/:name/:age', controller.chen.testParams) // 如果不传递其中一个，那么就会返回 404 页面
}
```

## POST 与传参

一定要关闭安全验证，不然连 apiFox 都不能访问

```js {19-24}
// code\egg\config\config.default.js

/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1716828868596_6870'

  // add your middleware config here
  config.middleware = []

  // 要关闭安全验证，否则 apiFox 都无法调试
  config.security = {
    csrf: {
      enable: false,
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
```

post 请求的参数封装在了 ctx.request.body 里面

```js{30-36}
const { Controller } = require('egg')

class ChenController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = '你好，我是陈伟'
  }

  async chenTest() {
    const { ctx } = this
    await new Promise(resolve => {
      setTimeout(() => {
        resolve((ctx.body = 'chenTest'))
      }, 5000)
    })
  }

  // 自由传参模式
  async testQuery() {
    const { ctx } = this
    ctx.body = ctx.query
  }

  // 严格传参模式
  async testParams() {
    const { ctx } = this
    ctx.body = `你好，${ctx.params.name}, 你今年 ${ctx.params.age} 岁吗`
  }

  async testPost() {
    const { ctx } = this
    ctx.body = {
      status: 200,
      data: ctx.request.body,
    }
  }
}

module.exports = ChenController
```

```js {19}
// code\egg\app\router.js

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/chenWei', controller.home.chenWei)

  // 新增的控制器
  router.get('/chen', controller.chen.index)
  router.get('/test', controller.chen.chenTest)

  // 传参模式
  router.get('/testQuery', controller.chen.testQuery) // 打印： {"age":"123"}
  router.get('/testParams/:name/:age', controller.chen.testParams) // 如果不传递其中一个，那么就会返回 404 页面

  router.post('/testPost', controller.chen.testPost)
}
```

```js
当发送：

{
    "a": 1
}

拿到：

{
    "status": 200,
    "data": {
        "a": 1
    }
}
```
