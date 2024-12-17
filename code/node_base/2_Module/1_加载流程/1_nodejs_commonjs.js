// 一、导入
/* let obj = require("./m");
console.log(obj); */

// 二、module
// let obj = require("../m");
/*  
    Module {
    id: 'D:\\学习\\3. Node服务端\\doc\\code\\1_Node\\6_Module\\m.js',
    path: 'D:\\学习\\3. Node服务端\\doc\\code\\1_Node\\6_Module',
    exports: 111,
    filename: 'D:\\学习\\3. Node服务端\\doc\\code\\1_Node\\6_Module\\m.js',
    loaded: false,
    children: [],
    paths: [
        'D:\\学习\\3. Node服务端\\doc\\code\\1_Node\\6_Module\\node_modules',
        'D:\\学习\\3. Node服务端\\doc\\code\\1_Node\\node_modules',
        'D:\\学习\\3. Node服务端\\doc\\code\\node_modules',
        'D:\\学习\\3. Node服务端\\doc\\node_modules',
        'D:\\学习\\3. Node服务端\\node_modules',
        'D:\\学习\\node_modules',
        'D:\\node_modules'
    ]
    }
 */

// 三、exports
/* const exports1 = require('./m')
console.log(exports1) */

// 四、同步加载
/*  
    因为这里的加载会阻塞，所以同步加载用在浏览器端肯定是不合适的
*/
/* console.log(222)
console.log(require('./m'))  // 111 */
