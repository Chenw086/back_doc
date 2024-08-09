const { Sequelize } = require('sequelize')
module.exports = {
	async test(ctx) {
    const res = await ctx.model.TestModel1.findAll({
      include: [
        {
          model: ctx.model.TestModel2,
          through: {}, // 无需中间表，仅用于绕过 Sequelize 的关联检查
          as: 'testModel2s',
          attributes: ['name', 'secondNum'],
          where: { // 这里可以添加其他过滤条件
            secondNum: {
              [Sequelize.Op.gt]: Sequelize.col('testModel1.firstNum')
            }
          }
        }
      ]
    })
  }
}

// 行不通，需要一定建立 associated 关系， 否则就使用原始 query 查询