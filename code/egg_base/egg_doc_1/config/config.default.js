exports.keys = 'asdads' // cookie 安全字符串

// 添加 view 配置项
exports.view = {
	defaultViewEngine: 'nunjucks',
	mapping: {
		'.tpl': 'nunjucks'
	}
}

exports.news = {
	pageSize: 5,
	serverUrl: 'https://hacker-news.firebaseio.com/v0'
}

exports.middleware = ['robot']
// robot's configurations
exports.robot = {
	ua: [/Baiduspider/i]
}
