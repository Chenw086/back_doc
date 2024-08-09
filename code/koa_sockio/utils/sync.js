const sequelize = require('../db/seq')

sequelize
	.sync({ alter: true })
	.then(() => {
		console.log('Database & tables created!!')
	})
	.catch((err) => console.log('Unable to create database:', err))
