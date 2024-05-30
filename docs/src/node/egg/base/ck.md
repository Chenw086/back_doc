---
title: egg - cook 与 session
---

# cook 与 session

::: danger 说明
cookie 保存在客户端浏览器中

session 保存在服务器上

当浏览器访问服务器并发送第一次请求时，服务器端会创建一个 session 对象，生成一个类似于 key,value 的键值对， 然后将 key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带 key(cookie)，找到对应的 session(value)
:::

## cook 的 curd

配合以下代码可以在 network 与 application 里面看效果

::: code-group

```html [chen.html] {15-20,24-53}
<!-- code\egg\app\view\chen.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="main.css" />
    <title>Document</title>
  </head>
  <body>
    <!-- 引用别的 html 文件 -->
    <%- include ('header.html')%>

    <div>
      <button onclick="add()">增</button>
      <button onclick="del()">删</button>
      <button onclick="edit()">改</button>
      <button onclick="show()">查</button>
    </div>

    <h1>你好，我是陈伟 <%= id%></h1>

    <script>
      const add = () =>
        fetch('/add', {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
        })
      const del = () =>
        fetch('/del', {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
        })
      const edit = () =>
        fetch('/edit', {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
        })
      const show = () =>
        fetch('/show', {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
          },
        })
    </script>
  </body>
</html>
```

```js [controller] {46-81}
// code\egg\app\controller\chen.js

const { Controller } = require('egg')

class ChenController extends Controller {
  async index() {
    const { ctx } = this
    // ctx.body = '你好，我是陈伟'

    await ctx.render('chen.html', {
      id: 123,
    })
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
    // ctx.body = ctx.query
    const res = await ctx.service.chen.getChen('123') // ctx.service.文件名.class里面的方法
    ctx.body = res
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

  async add() {
    const { ctx } = this
    ctx.cookies.set('user', 'chenWei')
    ctx.body = {
      status: 200,
      data: 'Cookie 添加成功',
    }
  }

  async del() {
    const { ctx } = this
    ctx.cookies.set('user', null)
    ctx.body = {
      status: 200,
      data: 'Cookie 删除成功',
    }
  }

  async edit() {
    const { ctx } = this
    ctx.cookies.set('user', 'chenEdit')
    ctx.body = {
      status: 200,
      data: 'Cookie 修改成功',
    }
  }

  async show() {
    const { ctx } = this

    console.log('取到的 cookie：', ctx.cookies.get('user'))
    ctx.body = {
      status: 200,
      data: 'Cookie 查看成功',
    }
  }
}

module.exports = ChenController
```

```js [router] {21-25}
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

  // cookie 学习
  router.post('/add', controller.chen.add)
  router.post('/del', controller.chen.del)
  router.post('/edit', controller.chen.edit)
  router.post('/show', controller.chen.show)
}
```

:::

## session

Session 默认存放在 Cookie 中，但是如果 session 过于庞大，就会带来一些额外的问题：

- 浏览器会有限制最大的 Cookie 长度，当设置的 Session 过大时，浏览器可能拒绝存储
- Cookie 每次请求时都会带上，当 Session 过大时，每次请求都要额外带上庞大的 Cookie 信息

session 的使用

::: code-group

```js [controller] {9,55,66,81}
// code\egg\app\controller\chen.js

const { Controller } = require('egg')

class ChenController extends Controller {
  async index() {
    const { ctx } = this
    // ctx.body = '你好，我是陈伟'
    const username = ctx.session.username

    await ctx.render('chen.html', {
      id: 123,
      username,
    })
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
    // ctx.body = ctx.query
    const res = await ctx.service.chen.getChen('123') // ctx.service.文件名.class里面的方法
    ctx.body = res
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

  async add() {
    const { ctx } = this
    // ctx.cookies.set('user', '陈伟', {
    //   maxAge: 1000 * 60,
    //   httpOnly: true, // 浏览器不能访问与修改
    //   encrypt: true, // 加密（加密之前不允许设置成中文的 cookie，但是加密后查看 cookie 打印是 undefined）
    // })
    ctx.session.username = 'chenwei'

    ctx.body = {
      status: 200,
      data: 'Cookie 添加成功',
    }
  }

  async del() {
    const { ctx } = this
    ctx.cookies.set('user', null)
    ctx.session = null

    ctx.body = {
      status: 200,
      data: 'Cookie 删除成功',
    }
  }

  async edit() {
    const { ctx } = this
    // ctx.cookies.set('user', 'chenEdit', {
    //   maxAge: 1000 * 60,
    //   httpOnly: true, // 浏览器不能访问与修改
    //   encrypt: true, // 加密（加密之前不允许设置成中文的 cookie，但是加密后查看 cookie 打印是 undefined）
    // })
    ctx.session.username = 'chenwei1'
    ctx.body = {
      status: 200,
      data: 'Cookie 修改成功',
    }
  }

  async show() {
    const { ctx } = this

    console.log(
      '取到的 cookie：',
      ctx.cookies.get(
        'user',
        { encrypt: true } // 加了这个以后，就可以解密加密后的cookie 能在控制台正常打印中文的 cookie了
      )
    )
    ctx.body = {
      status: 200,
      data: 'Cookie 查看成功',
    }
  }
}

module.exports = ChenController
```

```js [plugins] {14}
/** @type Egg.EggPlugin */
// module.exports = {
//   ejs: {
//     enable: true,
//     package: 'egg-view-ejs ',
//   },
// }

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
}

exports.session = true
```

```js [config.default] {38-45}
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
