module.exports = (app) => {
	const { router, controller } = app
	const courseRouter = router.namespace('/course/mysql')
	// courseRouter.get('/', controller.mysql.index.test)
	courseRouter.resources('user', '/', controller.mysql.users)
}
