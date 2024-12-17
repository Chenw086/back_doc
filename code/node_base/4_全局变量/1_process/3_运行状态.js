/*  
    运行状态：
        启动参数
        PID（进程ID）
        运行时间
*/


// 启动参数
console.log(process.argv);
/*  
控制台输入： node 3_运行状态.js 1 2
打印：
[
    'C:\\Program Files\\nodejs\\node.exe',  // node 启动程序路径
    'D:\\学习\\3. Node服务端\\doc\\code\\1_Node\\4_process\\3_运行状态.js',
    '1',
    '2'
]
*/

// PID, 可以在进程管理器里面找到这个信息
console.log(process.pid)  // 7884

// 运行时间
console.log(process.uptime())  // 这个文件从运行开始到结束的时间
// 0.0322816