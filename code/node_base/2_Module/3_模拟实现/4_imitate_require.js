/*  
    模块加载的基本实现
*/
const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}
}

/**
 * @description 传入路径，调用 fs.exists 查看是否存在路径，如果不存在则拼接 js json
 * @param {string} filename 传入路径
 * @returns {string} 返回转换的绝对路径
 */
Module._resolveFilename = function(filename) {
    // 利用 path 将 filename 转为绝对路径
    let absPath = path.resolve(__dirname, filename)

    // 判断当前路径对应的内容是否存在
    if(fs.existsSync(absPath)) {
        return absPath
    } else {
        let suffix = Object.keys(Module._extensions)
        for(let i = 0; i<suffix.length; i++) {
            let newPath = absPath + suffix[i]
            if(fs.existsSync(newPath)) {
                return newPath
            }
        }
        console.log(suffix)
    }
    throw new Error(`${filename} is not exists`)
}

Module._extensions = {
    /*  
        拿到文件内容，将函数包装在 iife 上，调用 vm.runInThisContext 执行函数，封装成一个包装函数。
        传入 Module 实例 {id: xxx, exports: {xxx}}。
        提取文件 dirname，拿到完整路径（filename）传入到封装函数内
    */
    '.js'(module) {
        // 读取
        let content = fs.readFileSync(module.id, 'utf-8')

        // 包装
        content = Module.wrapper[0] + content + Module.wrapper[1]
        console.log(content)

        // VM 
        let compileFn = vm.runInThisContext(content)

        // 准备参数的值
        let exports = module.exports
        let dirname =  path.dirname(module.id)      
        let filename = module.id
        console.log(exports)

        // 调用
        compileFn.call(exports, exports, myRequire, module, filename, dirname)
    },
    '.json'(module) {
        let content = JSON.parse(fs.readFileSync(module.id, 'utf8'))
        module.exports = content
    }
}

Module.wrapper = [
    "(function(exports, require, module, __filename, __dirname){",
    "})"
]
    
Module._cache = {}

/**
 * @description 拿到后缀名，调用后缀名对应的方法
 */
Module.prototype.load = function() {
    let extname = path.extname(this.id)
    // console.log(extname)  .js

    Module._extensions[extname](this)
}

function myRequire(filename) {
    // 1、绝对路径
    let mPath = Module._resolveFilename(filename)

    // 2、缓存优先
    /*  
        如果存在缓存则直接返回缓存内的内容，否则继续往下
    */
    let cacheModule = Module._cache[mPath]
    if(cacheModule) return cacheModule.exports

    // 3、创建空对象加载目标模块
    let module = new Module(mPath)

    // 4、缓存已加载过的模块
    Module._cache[mPath] = module

    // 5、执行加载（编译执行）
    module.load()

    // 6、返回数据
    return module.exports
}

let obj = myRequire('./4.1_v')

console.log(obj)