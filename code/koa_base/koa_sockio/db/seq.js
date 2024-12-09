const { Sequelize, Model } = require('sequelize')
const { seqConfig } = require('../config/config.default')
const fs = require('fs')
const path = require('path')

const sequelize = new Sequelize(seqConfig.database, seqConfig.username, seqConfig.password, {
	host: seqConfig.host,
	dialect: seqConfig.dialect,
	pool: seqConfig.pool,
	timezone: seqConfig.timezone
})

const getAllFilesSync = function (directory) {
	let results = []
	const list = fs.readdirSync(directory)

	list.forEach((file) => {
		const fullPath = path.join(directory, file)

		const stat = fs.statSync(fullPath)

		if (stat && stat.isDirectory()) {
			// 递归读取子目录
			results = results.concat(getAllFilesSync(fullPath))
		} else {
			// 添加文件到结果列表
			results.push(fullPath)
		}
	})

	return results
}

getAllFilesSync(path.resolve(__dirname, '../model')).forEach((file) => {
	require(`${file}`)(sequelize, Sequelize.DataTypes, Model)
})

// 如果模型之间有关系，请在这里设置
// Object.keys(db.models).forEach((modelName) => {
// 	if (db.models[modelName].associate) {
// 		db.models[modelName].associate(db.models)
// 		console.log(1)
// 	}
// })

module.exports = sequelize
