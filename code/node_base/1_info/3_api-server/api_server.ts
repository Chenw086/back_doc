/* 
    安装：
    
        1. npm i ts-node@9 -D-g：直接运行 Ts 而不是转换成 Js 以后再运行 
            再运行指令的时候就是 ts-node xxx.ts

        2. npm i express

        3. npm i @types/express -D  // 否则导入的时候下面文件会标红
*/
import express from 'express'
import { DataStore } from './data'
console.log(DataStore.list)  // [ { name: 'zce', age: 38 }, { name: '111', age: 12 } ]

const app = express()

app.get('/', (req, res) => {
    res.json(DataStore.list)  // 浏览器访问 localhost:8080 的时候就会正常返回了  
})

app.listen(8080, () => {
    console.log('服务已经正常开启了')
})