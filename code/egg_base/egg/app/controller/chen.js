const { Controller } = require('egg')

class ChenController extends Controller {
  async index() {
    const { ctx, app } = this
    // ctx.body = '你好，我是陈伟'
    const username = ctx.session.username

    console.log(ctx.session.counter)

    await ctx.render('chen.html', {
      // 方法扩展的调用
      // nowTime: app.currentTime(),

      // 属性扩展的调用
      nowTime: app.timeProp,
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

  async newContext() {
    const { ctx } = this
    const params = ctx.params() // get 打印 query 对象，post 打印 body
    console.log('params:', params)
    ctx.body = 'newContext'
  }
}

module.exports = ChenController
