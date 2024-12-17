/*  
  net 模块实现了底层通信接口

  通信过程:
    创建服务端
    创建客户端
    数据传输

  通信事件:
    listening：调用 server.listen 方法之后触发
    connection 事件：新的连接建立时触发
    close：当 server 关闭时触发
    error：当错误出现的时候触发
    data：当接收到数据的时候触发该事件
    
  方法：
    write：再 socket 上发送数据，默认时 utf8 编码
    end：当 socket 的一端发送 fin 包时触发，结束可读端
*/
