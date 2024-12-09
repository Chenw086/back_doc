module.exports = (appInfo) => {
	const config = {}
	config.keys = 'cookie.key'
	config.security = {
		csrf: { enable: false }
	}
	config.multipart = {
		mode: 'stream',
		fileSize: '50mb'
	}
	return {
		...config
	}
}
