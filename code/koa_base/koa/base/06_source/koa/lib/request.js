const url = require('url')
const request = {
  get method() {
    return this.req.method
  },
  get header() {
    return this.req.header
  },
  get url() {
    return this.req.url
  },
  get path() {
    return url.parse(this.req.path).pathname
  },
  get query() {
    return url.parse(this.req.path).query
  },
}

module.exports = request
