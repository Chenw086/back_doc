const Subscription = require('egg').Subscription

class GetTime extends Subscription {
	static get schedule() {
		return {
			interval: '3s',
			type: 'worker'
		}
	}

	async subscribe() {
		// console.log('schedule:', Date.now())
	}
}

module.exports = GetTime
