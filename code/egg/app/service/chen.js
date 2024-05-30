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
