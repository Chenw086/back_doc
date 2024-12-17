const fs = require('fs')
const vm = require('vm')

/*  
    读取文档里面的内容，然后执行
*/
let age = 23
let content = fs.readFileSync('text.txt', 'utf8')

//eval 
/* eval(content)
// 外面如果定义了 age 变量，这里会报错，所以不可取
console.log(age)  // 18 */

// Function
/* let fn = new Function('age', 'return age + 1')
console.log(fn(age))  // 24 */

vm.runInThisContext(content)
// vm.runInThisContext('age += 10')  这里会报错，报错外部没有定义 age 变量， 即使外面已经定义，无法拿到外部的局部变量
console.log(age)  // 23
