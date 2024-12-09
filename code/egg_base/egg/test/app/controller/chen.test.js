const { app } = require('egg-mock/bootstrap')

describe('chen - index', () => {
  it('chen index page', () => {
    return app.httpRequest().get('/chen').expect(200).expect('你好，我是陈伟')
  })

  // 异步单元测试其实就是多了一个 async
  it('chen test', async () => {
    return app.httpRequest().get('/test').expect(200).expect('chenTest')
  })
})

// 做测试的时候要关闭服务
