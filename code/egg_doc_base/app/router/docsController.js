module.exports = (app) => {
	const { router, controller } = app
	const controllerRouter = router.namespace('/controller')
	controllerRouter.post('/', controller.docsController.post.create)
	controllerRouter.get('/query', controller.docsController.query.query)
	controllerRouter.get('/param/:projectId/app/:appId', controller.docsController.query.param)
	controllerRouter.post('/body/list_post', controller.docsController.body.listPosts)
	controllerRouter.post('/file', controller.docsController.file.upload)
	controllerRouter.post('/file/stream', controller.docsController.file.stream)
}
