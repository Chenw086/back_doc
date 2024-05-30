---
title: egg - service
---

# service

::: danger 说明

service 封装的一个抽象层，用于处理复杂逻辑

- 数据库交互都在里面，保证 controller 逻辑更简单
- 独立性，service 能在多个 controller
- 写测试用例简单

在我的感受它更像一个通用方法调用的 api

:::

创建一个 service

```js
// code\egg\app\service\chen.js
const Service = require('egg').Service

class ChenService extends Service {
  async getChen(id) {
    return {
      id: id,
      name: '陈伟',
      age: 28,
    }
  }
}

module.exports = ChenService
```

在 controller 中使用

> 注意在 ctx.service.文件名 而不是 .暴漏出去的 class

```js {20-26}
// code\egg\app\controller\chen.js

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
}

module.exports = ChenController
```
