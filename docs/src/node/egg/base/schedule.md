---
title: egg - schedule
---

# 定时任务

::: danger 介绍
框架开发的 HTTP Server 是请求响应模型的，部分场景还是需要执行一些定时任务的：

1. 定时上报应用状态。
2. 定时从远程接口更新本地缓存。
3. 定时进行文件切割、临时文件删除。

:::

## 简单示例

所有的定时任务都统一存放在 app/schedule 目录下，每一个文件都是一个独立的定时任务

必须要定义两个函数：

1. 静态函数：schedule
2. subscribe

此场景是每隔 3S 在控制台输出时间

::: code-group

```js [schedule]
// code\egg\app\schedule\get_time.js

const Subscription = require('egg').Subscription

class GetTime extends Subscription {
 static get schedule() {
  return {
   interval: '3s',
   type: 'worker'
  }
 }

 async subscribe() {
  console.log('schedule:', Date.now())
 }
}

module.exports = GetTime
```

:::
