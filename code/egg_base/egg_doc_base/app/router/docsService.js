module.exports = (app) => {
	const { router, controller } = app
	const serviceRouter = router.namespace('/service')
	serviceRouter.get('/', controller.docsService.user.getUser)
}
