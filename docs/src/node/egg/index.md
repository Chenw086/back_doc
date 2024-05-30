---
title: egg - 开始
---

# 环境搭建

::: danger 提示

😍 一切都以官网为主：[egg 官网](https://www.eggjs.org/zh-CN)

这里的笔记内容只是记录快速上手

以及后期积累坑点笔记，详细内容一定要看官网！！！

:::

## 初始化与项目介绍

当前为了学习创建的是最简单的版本

```bash
mkdir egg && cd egg
npm init egg --type=simple
npm i
```

启动项目

```bash
# 这个是调试模式的启动方式
npm run dev
```

项目的目录结构，以及相对应文件作用：

```bash
egg
├── README.md # ...
├── app # 项目开发主目录，工作中的代码几乎都在这里
│   ├── controller  # 控制器目录，所有的控制器都写在这里
│   │   └── home.js
│   └── router.js # 项目的路由文件
├── config  # 项目配置目录，比如插件相关的配置
│   ├── config.default.js # 系统默认配置文件
│   └── plugin.js # 插件配置文件
├── jsconfig.json # js 配置文件，对所在目录下所有 js 代码个性化支持
├── package-lock.json
├── package.json
├── test  # 项目测试文件
│   └── app
│       └── controller
│           └── home.test.js
└── typings # ts 配置目录，项目可以使用 ts 开发
    ├── app
    │   ├── controller
    │   │   └── index.d.ts
    │   └── index.d.ts
    └── config
        ├── index.d.ts
        └── plugin.d.ts
```

## 简单配置一个接口

当前服务运行在：`http://127.0.0.1:7001`

```js {10-13}
// code\egg\app\controller\home.js
const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }

  async chenWei() {
    const { ctx } = this
    ctx.body = '你好，陈伟'
  }
}

module.exports = HomeController
```

```js {7}
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/chenWei', controller.home.chenWei)
}
```

然后 get 请求：`http://127.0.0.1:7001/chenWei` 就能拿到： '你好，陈伟'
