module.exports = (app) => {
	require('./router/docsExtend.js')(app)
	require('./router/docsController.js')(app)
	require('./router/docsService.js')(app)
}
