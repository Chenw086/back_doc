const context = {
  // 别名指向
  // get method() {
  //   return this.request.method
  // },
  // get url() {
  //   return this.request.url
  // },
}

defineProperty('request', 'method')
defineProperty('request', 'url')
defineProperty('response', 'body')

function defineProperty(target, name) {
  // 又是一种写法（前所未见）
  // context.__defineGetter__(name, function () {
  //   return this[target][name]
  // })

  // 常规写法
  Object.defineProperty(context, name, {
    get() {
      return this[target][name]
    },
    set(value) {
      this[target][name] = value
    },
  })
}

// body 可以设置多次，以最后设置的为准

module.exports = context
