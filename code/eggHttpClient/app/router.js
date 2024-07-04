module.exports = (app) => {
	const { router, controller } = app
	router.get('/', controller.home.isIOS)
	router.get('/npm', controller.npm.index)
}
