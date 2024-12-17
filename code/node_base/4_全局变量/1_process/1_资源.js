/*  
    1. 资源： cpu 内存
*/
console.log(process.memoryUsage())
// {
//     rss: 19828736,   常驻内存
//     heapTotal: 4931584,  申请的内存大小
//     heapUsed: 4099552,   脚本执行使用的内存大小
//     external: 309830,    扩展内存(存放c/c++核心模块所占据大小)
//     arrayBuffers: 11158  代表一片独立的空间大小，不代表 v8 内存
// }

/*  
    如果注册一片 1000 byte的内存，那么 arrayBuffers 就会变成 12158
*/
Buffer.alloc(1000)
console.log(process.memoryUsage())  // {...,arrayBuffers: 12158}


/* 内存信息 */
console.log(process.cpuUsage())
/*  
    { user: 15000, system: 15000 }
    user: 用户操作占用时间片段
    system：操作系统操作所占用时间片段
*/