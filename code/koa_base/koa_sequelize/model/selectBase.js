const dayjs = require('dayjs')

module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		'SelectBase',
		{
			first: DataTypes.STRING,
			last: DataTypes.STRING,
			create_time: {
				type: DataTypes.DATE,
				get() {
					console.log(this.getDataValue('create_time'), 222222) // 这里打印的是 unix 时间
					return dayjs(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss')
				},
				allowNull: false,
				defaultValue: DataTypes.NOW
			},
			update_time: {
				type: DataTypes.DATE,
				get() {
					return dayjs(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss')
				},
				allowNull: false,
				defaultValue: DataTypes.NOW
			}
		},
		{
			tableName: 'select_base',
			updatedAt: 'update_time',
			createdAt: 'create_time'
		}
	)
