// const User = (sequelize, DataTypes) =>
// 	sequelize.define('User', {
// 		firstName: {
// 			type: DataTypes.STRING,
// 			allowNull: false
// 		},
// 		lastName: {
// 			type: DataTypes.STRING
// 			// allowNull 默认为 true
// 		}
// 	})

// console.log(User === sequelize.models.User)  true
const dayjs = require('dayjs')

const User = (sequelize, DataTypes, Model) => {
	class User extends Model {
		getFullName() {
			return [this.firstName, this.lastName].join(' ')
		}
	}
	User.init(
		{
			// 在这里定义模型属性
			firstName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING
				// allowNull 默认为 true
			},
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
			},
			commentMe: {
				type: DataTypes.INTEGER,
				comment: '这是带有注释的列'
			}
		},
		{
			// 这是其他模型参数
			sequelize, // 我们需要传递连接实例
			modelName: 'User', // 我们需要选择模型名称
			tableName: 'Employee',
			updatedAt: 'update_time',
			createdAt: 'create_time'
		}
	)

	return User
}

module.exports = User
