const sequelize = require('./config/database')

sequelize
	.sync()
	.then(() => {
		console.log('Database & tables created!')
	})
	.catch((err) => console.log('Unable to create database:', err))
