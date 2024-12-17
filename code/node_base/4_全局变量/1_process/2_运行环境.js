// 运行环境：运行目录、node 环境、cpu 架构、用户环境、系统平台

/* 运行目录 */
console.log(process.cwd());
// D:\学习\3. Node服务端\doc\code\1_Node\4_process

/* 当前版本 */
console.log(process.version);
// v16.15.1

/* 打印所有的版本信息 */
// console.log(process.versions)

/* cpu */
console.log(process.arch);
// x64

/* 用户环境 */
// process.env.NODE_ENV = "production";
console.log(process.env.NODE_ENV, "process.env.NODE_ENV");

/* 系统环境变量 */
// console.log(process.env.PATH)
// D:\java\tools\bin;C:\ProgramData\Oracle\Java\javapath;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;rogram Files\Git\cmd;wnloadSelf\node\;ogram Files\TortoiseSVN\bin;l\redis\;D:\tools\Xshell\;D:\tools\Xftp7\;C:\nvm;C:\Program Files\nodejs;D:\下载的软件\Git\cmd;C:\Users\陈伟\AppData\Local\Microsoft\WindowsApps;D:\下 载的软件\Microsoft VS Code\bin;C:\nvm;C:\Program Files\nodejs;

/* 本机管理员目录 */
console.log(process.env.USERPROFILE); // mac 为 HOME
// C:\Users\陈伟

/* 平台信息, 管理员目录不确定使用哪个的时候，就能先获取这个信息 */
console.log(process.platform);
// win32
