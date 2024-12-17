const path = require('path')

console.log(__filename)
// D:\学习\3. Node服务端\doc\code\1_Node\5_核心模块\1_path>node 1_info.js
console.log(__dirname)
// D:\学习\3. Node服务端\doc\code\1_Node\5_核心模块\1_path

console.log('****************** basename ****************')

/* 
    basename 
        以下打印路径的最后一个。
        如果最后面是一个路径分隔符，那么就会自动忽略掉，就像没有一样。
        第一个参数需要是字符串。
        第二个参数表示扩展名，如果没有设置就会返回完整的文件名称带后缀。
            第二个参数为后缀时，如果没有在当前路径匹配，就忽略。
*/
console.log(path.basename(__filename))  // 1_info.js
console.log(path.basename(__filename, '.js'))  // 1_info
console.log(path.basename(__filename, '.css'))  // 1_info.js
console.log(path.basename('/a/b/c'))  // c
console.log(path.basename('/a/b/c/'))  // c


console.log('****************** dirname ****************')

/*  
    dirname
        返回路径中最后一个部分的上一层目录所在路径
*/
console.log(path.dirname(__filename))  // D:\学习\3. Node服务端\doc\code\1_Node\5_核心模块\1_path
console.log(path.dirname('/a/b/c'));  // /a/b
console.log(path.dirname('/a/b/c/'));  // /a/b


console.log('****************** extname ****************')

/*  
    extname：获取路径扩展名
        返回 path 路径中相应文件的后缀名
        如果 path 路径中存在多个 . ，它匹配的是最后一个点到结尾的内容
*/
console.log(path.extname(__filename))  // .js
console.log(path.extname('/a/b/c/'))  // 什么都没返回，空的
console.log(path.extname('/a/b/c/index.html.css.js'))  // .js
console.log(path.extname('/a/b/c/index.html.css.'))  // .


console.log('****************** parse ****************')

/*  
    parse：
        接收一个路径，返回一个对象，包含不同的信息。
*/
console.log(path.parse(__filename))
/*  
    {
        root: 'D:\\',
        dir: 'D:\\学习\\3. Node服务端\\doc\\code\\1_Node\\5_核心模块\\1_path',
        base: '1_info.js',
        ext: '.js',
        name: '1_info'
    }
*/
console.log(path.parse('/a/b/c/d/index.js'))
/*  
    {
        root: '/',
        dir: '/a/b/c/d',
        base: 'index.js',
        ext: '.js',
        name: 'index'
    }
*/
console.log(path.parse('./a/b/index.js'))
// { root: '', dir: './a/b', base: 'index.js', ext: '.js', name: 'index' }


console.log('****************** format ****************')

/*  
    format
*/
const obj = path.parse('./a/b/c/index.js')
console.log(path.format(obj))  // ./a/b/c\index.js

/*  
    isAbsolute
*/
console.log(path.isAbsolute('foo'))  // false
console.log(path.isAbsolute('/foo'))  // true
console.log(path.isAbsolute('/'))  // true
console.log(path.isAbsolute('./'))  // false
console.log(path.isAbsolute('../foo'))  // false


console.log('****************** join ****************')

/*  
    join：拼接路径
*/
console.log(path.join('a/b', 'c', 'index.js'))  // a\b\c\index.js
console.log(path.join('/a/b', 'c', 'index.js'))  // \a\b\c\index.js
console.log(path.join('/a/b','', 'c', 'index.js'))  // \a\b\c\index.js
console.log(path.join('/a/b', '../', 'index.js'))  // \a\index.js
console.log(path.join('/a/b', './', 'index.js'))  // \a\b\index.js
console.log(path.join(''))  // . 代表当前的工作目录
console.log(path.join(__dirname, '\\a'))  // D:\学习\3. Node服务端\doc\code\1_Node\5_核心模块\1_path\a
console.log(path.join(__dirname, '/a'))  // D:\学习\3. Node服务端\doc\code\1_Node\5_核心模块\1_path\a


console.log('****************** normalize ****************')

/*  
    normalize：规范化路径
*/
console.log(path.normalize(''))  // . 当前路径
console.log(path.normalize('a/b/c'))  // a\b\c
console.log(path.normalize('a//b/c../d'))  // a\b\c..\d
console.log(path.normalize('a//\\b//\\c'))  // a\b\c



console.log('****************** resolve ****************')

/*  
    resolve：绝对路径
*/
console.log(path.resolve())  // D:\学习\3. Node服务端\doc\code\1_Node\5_核心模块\1_path
// 相当于 process.cwd()

console.log(path.resolve('a', 'b'))
// D:\学习\3. Node服务端\doc\code\1_Node\5_核心模块\1_path\a\b

console.log(path.resolve('/a', '/b'))  // D:\b
console.log(path.resolve('/a', 'b'))  // D:\a\b
console.log(path.resolve('../a'))  // D:\学习\3. Node服务端\doc\code\1_Node\5_核心模块\a
console.log(path.resolve('\\a'))  // D:\a
console.log(path.resolve(__dirname, '\\a'))  // D:\a