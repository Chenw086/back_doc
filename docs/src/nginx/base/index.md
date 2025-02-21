---
title: nginx - 全局块
---

# 全局块

::: warning 提示
所有二级标题都是全局快
:::

nginx.conf 配置文件中默认有三大块：

- 全局块
- events 块
- http 块

http 块中可以配置多个 server 块，server 块中可以配置多个 location 块。

当修改了配置文件需要重新加载配置文件才会生效

```bash
nginx -s reload
```

基础配置

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

**解释 include mime.types:**

在给定的 nginx 配置文件中，include 指令用于包含其他文件。在这个例子中，include mime.types 指令告诉 Nginx 在处理请求时，使用 mime.types 文件中定义的 MIME 类型。

MIME 类型（Multipurpose Internet Mail Extensions）是一种用于描述互联网媒体类型（如文本、图像、音频、视频等）的格式。MIME 类型通常用于 HTTP 请求和响应头中，以指定服务器返回的资源类型。

例如，include mime.types 指令可能包含以下内容：

```nginx
include mime.types;
```

## user

用于配置运行 nginx 服务器的 worker 进程的用户和用户组

[user](https://docshome.gitbook.io/nginx-docs/he-xin-gong-neng#user)

属性也能在编译的时候指定，语法如下：

```shell
./configure --user=www --group=www
```

如果两个地方都进行了设置，那么以配置文件中的设置为准

```nginx
[root@localhost conf]# cat nginx.conf

user  test;
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;


    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   /root/test/html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /root/test/html;
        }
    }

}
```

以上配置，访问主页的时候会报 403 错误，因为 nginx 没有权限访问 /root/test/html 目录

当改为以下配置：

```nginx
...

location / {
    root   /home/test/html;
    index  index.html index.htm;
}

...
```

就可以正常的访问了

::: danger 提示
使用 user 指令可以指定启动运行工作进程的用户及用户组

这样对于系统的权限访问控制的更加精细，也更加安全
:::

::: info nobody

nobody 是 nginx 的默认用户，在配置文件中使用 nobody 作为用户名，可以确保 nginx 以非特权用户身份运行，从而提高系统的安全性。

它通常拥有最少的系统权限，几乎没有对系统资源的访问权限

:::

## worker_processes

用于配置运行 nginx 服务器的 worker 进程的数量

![](./img/index/index__2025-02-10-19-05-33.png){width="90%"}

用于配置 nginx 生成工作进程的数量，这个是 nginx 服务器实现并发处理的关键所在

::: info
理论上来说 worker_process 的值越大，可以支持的并发处理量越大

但是，如果设置的值过大，会导致系统资源消耗过大，从而影响系统的性能

建议将该值和服务器 CPU 核数保持一致
:::

多的进程可以在 `ps -ef | grep nginx` 中查看

## daemon

设置 nginx 是否以守护进程的方式启动

守护进程是 linux 后台执行的一种服务进程，独立于控制终端，不会随着终端关闭而停止

| 语法 | daemon on/off |
| ---- | ------------- |
| 默认 | on            |
| 位置 | main          |

## pid

用来配置 nginx 当前 master 进程的 pid 文件路径

| 语法 | pid 文件路径 |
| ---- | ------------ |
| 默认 | nginx.pid    |
| 位置 | main         |

这个属性可以通过 `./configure --pid-path=路径` 在编译的时候指定

## error_log

用于配置 nginx 的错误日志文件路径

| 语法 | error_log 文件路径 |
| ---- | ------------------ |
| 默认 | logs/error.log     |
| 位置 | main               |

这个属性可以通过 `./configure --error-log-path=路径` 在编译的时候指定

::: danger 提示
建议设置的时候不要设置成 info 以下等级

因为会带来大量的磁盘 I/O 操作，从而影响系统的性能
:::

## include

用于配置 nginx 的配置文件包含路径

| 语法 | include 路径 |
| ---- | ------------ |
| 默认 | -            |
| 位置 | main         |

## events

用于配置 nginx 的事件处理模型

| 语法 | events 模型 |
| ---- | ----------- |
| 默认 | select      |
| 位置 | main        |

**accept_mutex**

用于配置 nginx 是否启用 accept 锁机制，设置 nginx 网络序连接序列化

| 语法 | accept_mutex on/off |
| ---- | ------------------- |
| 默认 | on                  |
| 位置 | events              |

这个配置主要可以用来解决常说的"惊群"问题。

大致意思是在某一个时刻，客户端发来一个请求连接，Nginx 后台是以多进程的工作模式，也就是说有多个 worker 进程会被同时唤醒，但是最终只会有一个进程可以获取到连接，如果每次唤醒的进程数目太多，就会影响 Nginx 的整体性能。

如果将上述值设置为 on(开启状态)，将会对多个 Nginx 进程接收连接进行序列号，一个个来唤醒接收，就防止了多个进程对连接的争抢

![](./img/index/index__2025-02-10-19-20-12.png){width="90%"}

**multi_accept**

用于配置 nginx 是否启用多连接接收，设置 nginx 是否可以同时接收多个连接

如果 multi_accept 被禁止了，nginx 一个工作进程只能同时接收一个新的连接。否则，一个工作进程可以接收所有的新连接

| 语法 | multi_accept on/off |
| ---- | ------------------- |
| 默认 | off                 |
| 位置 | events              |

**worker_connections**

用于配置每个 worker 进程可以同时打开的最大连接数

::: info
这里的连接数不仅仅包括和前端用户建立的连接数，而是包括所有可能的连接数

另外，number 值不能大于操作系统支持打开的最大文件句柄数量
:::

| 语法 | worker_connections 数量 |
| ---- | ----------------------- |
| 默认 | 512                     |
| 位置 | events                  |

**use**

用于配置 nginx 是否启用 epoll 模型

| 语法 | use epoll/select/poll |
| ---- | --------------------- |
| 默认 | epoll                 |
| 位置 | events                |

::: danger 提示
此处所选择事件处理模型是 Nginx 优化部分的一个重要内容，method 的可选值有 select/poll/epoll/kqueue 等

之前在准备 centos 环境的时候，我们强调过要使用 linux 内核在 2.6 以上，就是为了能使用 epoll 函数来优化 Nginx
:::

查看内核版本

```shell
[root@localhost conf]# uname -r
5.11.12-300.el7.aarch64
```

另外这些值的选择，可以在编译的时候使用

- --with-select_module、--without-select_module
- --with-poll_module、--without-poll_module
- --with-epoll_module、--without-epoll_module
- --with-kqueue_module、--without-kqueue_module

配置示例

```nginx
events{
  accept_mutex on;
  multi_accept on;
  worker_commections 1024;
  use epoll;
}
```

## http

### mime.types

浏览器中可以显示的内容有 HTML、XML、GIF 等种类繁多的文件、媒体等资源，浏览器为了区分这些资源，就需要使用 MIME Type，MIME Type 是网络资源的媒体类型

Nginx 作为 web 服务器，也需要能够识别前端请求的资源类型，所以需要使用 mime.types 文件来定义

在 nginx 中默认有两行配置

```nginx
include mime.types;
default_type application/octet-stream;
```

### default_type

用于配置 nginx 默认的 MIME 类型

| 语法 | default_type MIME 类型   |
| ---- | ------------------------ |
| 默认 | application/octet-stream |
| 位置 | http、server、location   |

在 default_type 之前还有一句 include mime.types

```nginx
[root@localhost conf]# head -10 mime.types

types {
    text/html                                        html htm shtml;
    text/css                                         css;
    text/xml                                         xml;
    image/gif                                        gif;
    image/jpeg                                       jpeg jpg;
    application/javascript                           js;
    application/atom+xml                             atom;
    application/rss+xml                              rss;
...
}
```

include 之前我们已经介绍过，相当于把 mime.types 文件中 MIME 类型与相关类型文件的文件后缀名的对应关系加入到当前的配置文件中

有些时候，请求某些接口的时候需要返回指定的文本字符串或者 json 字符串，那么可以使用 nginx 快速实现

```nginx
location /get_text {
    # 这里也可以设置成text/plain
    default_type text/html;
    return 200 "This is nginx's text";
}
location /get_json{
    default_type application/json;
    return 200 '{"name":"TOM","age":18}';
}
```

### 自定义服务日志

nginx 中日志的类型分 access_log 和 error_log

- access_log 用于记录客户端的请求日志
- error_log 用于记录 nginx 的错误日志

nginx 服务器支持对服务日志的格式、大小、输出等进行设置，需要用到两个指令，分别是 access_log 和 log_format 指令

access_log 指令用于配置 nginx 的访问日志，语法如下

```nginx
access_log 日志文件路径 日志格式
```

log_format 指令用于配置 nginx 的日志格式，语法如下

```nginx
log_format 日志格式名称 日志格式
```

::: danger log_format 参考文档
[官方](https://docshome.gitbook.io/nginx-docs/he-xin-gong-neng/http/ngx_http_log_module)

[博客园](https://www.cnblogs.com/kevingrace/p/5893499.html)
:::

### sendfile

用于配置 nginx 是否启用 sendfile 功能，sendfile 是 Linux 内核提供的一种高效的数据传输机制

该属性可以大大提高 nginx 处理静态资源的性能

| 语法 | sendfile on/off |
| ---- | --------------- |
| 默认 | on              |
| 位置 | http            |

### keepalive_timeout

用于配置 nginx 是否启用 keepalive 功能，keepalive 是 HTTP 协议中的一个特性，用于保持客户端和服务器之间的连接

| 语法 | keepalive_timeout 时间 |
| ---- | ---------------------- |
| 默认 | 75                     |
| 位置 | http                   |

::: info
那为什么要使用 keep-alive 呢？

HTTP 是一种无状态协议，客户端向服务端发送一个 TCP 请求，服务端响应完毕后断开连接。

如何客户端向服务端发送多个请求，每个请求都需要重新创建一次连接，效率相对来说比较差，使用 keepalive 模式，可以告诉服务器端在处理完一个请求后保持这个 TCP 连接的打开状态，若接收到来自这个客户端的其他请求，服务端就会利用这个未被关闭的连接，而不需要重新创建一个新连接，提升效率，但是这个连接也不能一直保持，这样的话，连接如果过多，也会是服务端的性能下降，这个时候就需要我们进行设置其的超时时间
:::

### keepalive_requests

用于配置 nginx 在 keepalive 模式下，一个连接最多可以处理的请求数

| 语法 | keepalive_requests 数量 |
| ---- | ----------------------- |
| 默认 | 100                     |
| 位置 | http                    |

### server、location

后面的笔记会详细介绍

```nginx
server {
      listen       80;
      server_name  localhost;
      location / {
          root   html;
          index  index.html index.htm;
      }

      error_page   500 502 503 504 404  /50x.html;
      location = /50x.html {
          root   html;
      }
  }
```

## 基础配置实例

配置文件目录

```shell
[root@nginx001 nginx]# tree ./conf/conf.d/
./conf/conf.d/
├── server1.conf
└── server2.conf

0 directories, 2 files
```

静态文件目录

```shell
[root@nginx001 nginx]# tree ./html/
./html/
├── 50x.html
├── index.html
└── www
    └── myweb
        ├── 404.html
        ├── server1
        │   ├── location1
        │   │   └── index_sr1_location1.html
        │   ├── location2
        │   │   └── index_sr1_location2.html
        │   └── logs
        │       └── access.log
        └── server2
            ├── location1
            │   └── index_sr2_location1.html
            ├── location2
            │   └── index_sr2_location2.html
            └── logs
                └── access.log

10 directories, 9 files
```

nginx.conf

```nginx
worker_processes  2;

events {
    accept_mutex on;
    worker_connections  1024;
    multi_accept        on;
    use epoll;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_requests 100;
    keepalive_timeout  65;

        #配置请求处理日志格式
        log_format server1 '===>server1 access log';
        log_format server2 '===>server2 access log';

        # 基础配置案例
        include /usr/local/nginx/conf/conf.d/*.conf;

        server {
                listen       80;
                server_name  localhost;
                location / {
                        default_type text/html;
                        return 200 "This is nginx's text";
                }

                error_page   500 502 503 504 404  /50x.html;
                location = /50x.html {
                        root   html;
                }
        }
}
```

server1.conf

```nginx
server{
          #配置监听端口和主机名称
          listen 8081;
          server_name localhost;
          #配置请求处理日志存放路径
          access_log /usr/local/nginx/html/www/myweb/server1/logs/access.log server1;
          #配置错误页面
          error_page 404 /404.html;
          #配置处理/server1/location1请求的location
          location /server1/location1{
                  root /usr/local/nginx/html/www/myweb;
                  index index_sr1_location1.html;
          }
          #配置处理/server1/location2请求的location
          location /server1/location2{
                  root /usr/local/nginx/html/www/myweb;
                  index index_sr1_location2.html;
          }
          #配置错误页面转向
          location = /404.html {
                  root html/www/myweb;
                  index 404.html;
          }
}
```

server2.conf

```nginx
server{
        #配置监听端口和主机名称
        listen 8082;
        server_name localhost;
        #配置请求处理日志存放路径
        access_log /usr/local/nginx/html/www/myweb/server2/logs/access.log server2;
        #配置错误页面,对404.html做了定向配置
        error_page 404 /404.html;
        #配置处理/server1/location1请求的location
        location /server2/location1{
                root /usr/local/nginx/html/www/myweb;
                index index_sr2_location1.html;
        }
        #配置处理/server2/location2请求的location
        location /server2/location2{
                root /usr/local/nginx/html/www/myweb;
                index index_sr2_location2.html;
        }
        #配置错误页面转向
        location = /404.html {
                root html/www/myweb;
                index 404.html;
        }
}

```
