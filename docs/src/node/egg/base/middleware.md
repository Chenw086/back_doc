---
title: egg - middleware
---

# middleware

## 全局配置

这样配置完毕以后，会挂载到 app.config.appMiddleware

::: code-group

```js [count.js]
// code\egg\app\middleware\counter.js

module.exports = options => {
  return async (ctx, next) => {
    if (ctx.session.counter) {
      ctx.session.counter++
    } else {
      ctx.session.counter = 1
    }
    await next()
  }
}
```

```js [config.default.js] {18-19}
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
  config.middleware = ['counter']

  // 要关闭安全验证，否则 apiFox 都无法调试
  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  }

  config.static = {
    prefix: '',
  }

  // 修改 session 配置
  config.session = {
    key: 'chen_test',
    maxAge: 60 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true, // 再次交互的时候刷新 session 时间
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

:::

## 路由中使用

counter.js 中的内容保持不变

config.default.js 里面的 config.middleware = []

不将中间件挂载到全局

```js {7,13}
// code\egg\app\router.js

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const counter = app.middleware.counter()
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/chenWei', controller.home.chenWei)

  // 新增的控制器
  router.get('/chen', counter, controller.chen.index)
  router.get('/test', controller.chen.chenTest)

  // 传参模式
  router.get('/testQuery', controller.chen.testQuery) // 打印： {"age":"123"}
  router.get('/testParams/:name/:age', controller.chen.testParams) // 如果不传递其中一个，那么就会返回 404 页面

  router.post('/testPost', controller.chen.testPost)

  // cookie 学习
  router.post('/add', controller.chen.add)
  router.post('/del', controller.chen.del)
  router.post('/edit', controller.chen.edit)
  router.post('/show', controller.chen.show)
}
```

这样挂载以后，以后只会访问 /chen 的时候，触发中间件
