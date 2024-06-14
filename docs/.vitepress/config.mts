import { defineConfig } from 'vitepress'
import path from 'path'

// console.log(1111, __dirname, path.resolve(__dirname, './src'))

export default defineConfig({
	title: '后台笔记',
	titleTemplate: ':title',
	description: 'linux、nginx、sql、node...',
	head: [['link', { rel: 'icon', href: '/favicon.ico' }]], // 网址图标
	srcDir: 'src', // 相对于根目录的 md 文件夹
	srcExclude: ['**/README.md'],
	assetsDir: 'static', // 静态资源的目录
	lastUpdated: true, // 是否显示最后修改时间
	markdown: {
		container: {
			tipLabel: '提示',
			warningLabel: '警告',
			dangerLabel: '危险',
			infoLabel: '信息',
			detailsLabel: '详细信息'
		},
		lineNumbers: true, // 行号
		image: {
			// 默认禁用图片懒加载
			lazyLoading: true
		}
	},
	themeConfig: {
		docFooter: {
			prev: '上一章',
			next: '下一章'
		},
		logo: '/logo.svg',
		siteTitle: '陈伟的后端',
		// outlineTitle: '大纲',
		// outline: [2, 4],
		externalLinkIcon: true,
		outline: {
			label: '大纲',
			level: [2, 4]
		},
		lastUpdated: {
			text: '最后修改时间：',
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'medium'
			}
		},
		// editLink: {
		//   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
		//   text: 'Edit this page on GitHub',
		// },
		nav: [
			{
				text: 'node',
				link: '/node/',
				activeMatch: '/node/'
			},
			{
				text: 'linux',
				link: '/linux/',
				activeMatch: '/linux/'
			},
			{
				text: 'nginx',
				link: '/nginx/',
				activeMatch: '/nginx/'
			},
			{
				text: '数据库',
				activeMatch: '/mongodb|mysql|redis/',
				items: [
					{
						text: 'mysql',
						link: '/mysql/',
						activeMatch: '/mysql/'
					},
					{
						text: 'redis',
						link: '/redis/',
						activeMatch: '/redis/'
					},
					{
						text: 'mongodb',
						link: '/mongodb/',
						activeMatch: '/mongodb/'
					}
				]
			}
		],
		search: {
			provider: 'local'
		},
		// carbonAds: {
		//   code: 'your-carbon-code',
		//   placement: 'your-carbon-placement',
		// },
		footer: {
			message: '好好学习，天天向上。',
			copyright: 'Copyright © 2019-present Wei Chen'
		},
		sidebar: {
			'/linux/': [
				{
					text: '说明',
					link: '/linux/'
				},
				{
					text: '基础',
					collapsed: true,
					items: [
						{ text: '安装', link: '/linux/base/' },
						{ text: '文件系统', link: '/linux/base/sys_doc' },
						{ text: 'Vim', link: '/linux/base/vim' },
						{ text: '网络配置', link: '/linux/base/network' },
						{ text: '远程登录', link: '/linux/base/terminal' },
						{ text: '虚拟机克隆', link: '/linux/base/clone' },
						{ text: '系统管理', link: '/linux/base/manager' }
					]
				},
				{
					text: '场景与问题',
					collapsed: true,
					items: [{ text: '开始', link: '/linux/problem/' }]
				}
			],
			'/mongodb/': [
				{
					text: '开始',
					link: '/mongodb/'
				}
			],
			'/mysql/': [
				{
					text: '开始',
					link: '/mysql/'
				},
				{
					text: '基础',
					items: [
						{ text: '查询', link: '/mysql/base/select' },
						{ text: '运算符', link: '/mysql/base/operator' },
						{ text: '排序与分页', link: '/mysql/base/orderLimit' },
						{ text: '函数', link: '/mysql/base/function' },
						{ text: '创建与管理库表', link: '/mysql/base/table' },
						{ text: '数据增删改', link: '/mysql/base/handleData' },
						{ text: '数据类型', link: '/mysql/base/type' },
						{ text: '约束', link: '/mysql/base/constraint' },
						{ text: '视图', link: '/mysql/base/view' },
						{ text: '存储过程与函数', link: '/mysql/base/procedure' },
						{ text: '变量、流程控制与游标', link: '/mysql/base/variable' }
					]
				}
			],
			'/nginx/': [
				{
					text: '开始',
					link: '/nginx/'
				}
			],
			'/node/': [
				{
					text: '开始',
					link: '/node/'
				},
				{
					text: '基础',
					collapsed: true,
					items: [{ text: '环境配置', link: '/node/base/' }]
				},
				{
					text: 'koa',
					collapsed: true,
					items: [
						{ text: '路由', link: '/node/koa/' },
						{ text: '静态资源', link: '/node/koa/static' },
						{ text: '重定向', link: '/node/koa/redirect' },
						{ text: '中间件', link: '/node/koa/middleware' },
						{ text: '异常处理', link: '/node/koa/error' },
						{ text: '源码实现', link: '/node/koa/source' }
					]
				},
				{
					text: 'egg',
					collapsed: true,
					items: [
						{ text: '环境搭建', link: '/node/egg/' },
						{
							text: '基础',
							items: [
								{ text: '控制器与单元测试', link: '/node/egg/base/' },
								{ text: 'GET、POST 与传参', link: '/node/egg/base/request' },
								{ text: 'service', link: '/node/egg/base/service' },
								{ text: 'ssr', link: '/node/egg/base/ssr' },
								{ text: 'ck', link: '/node/egg/base/ck' },
								{ text: 'middleware', link: '/node/egg/base/middleware' },
								{ text: 'extend', link: '/node/egg/base/extend' },
								{ text: 'schedule', link: '/node/egg/base/schedule' }
							]
						}
					]
				}
			],
			'/redis/': [
				{
					text: '开始',
					link: '/redis/'
				}
			]
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
	}
})
