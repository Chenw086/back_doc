module.exports = (sequelize, DataTypes) =>
	sequelize.define('InstanceBase', {
		name: DataTypes.TEXT,
		favoriteColor: {
			type: DataTypes.TEXT,
			defaultValue: 'green'
		},
		age: DataTypes.INTEGER,
		cash: DataTypes.INTEGER
	})
