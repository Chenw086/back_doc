const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async chenWei() {
    const { ctx } = this;
    ctx.body = '你好，陈伟';
  }
}

module.exports = HomeController;
