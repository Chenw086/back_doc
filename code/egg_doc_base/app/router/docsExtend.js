module.exports = (app) => {
	const { router, controller } = app
	const ExtendRouter = router.namespace('/extend')
	ExtendRouter.get('/', controller.docsExtend.user.test)
	ExtendRouter.get('/ctx', controller.docsExtend.user.ctxTest)
	ExtendRouter.get('/requestTest', controller.docsExtend.user.requestTest)
	ExtendRouter.get('/responseTest', controller.docsExtend.user.responseTest)
	ExtendRouter.get('/helperTest', controller.docsExtend.user.helperTest)
}
