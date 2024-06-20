---
title: redis - 配置相关
---

# 运行与停止

**安装目录介绍**

| 可执行文件       | 说明               |
| :--------------- | ------------------ |
| redis-server     | redis 服务器       |
| redis-cli        | redis 命令行客户端 |
| redis-benchmark  | redis 性能测试工具 |
| redis-check-aof  | aof 文件修复工具   |
| redis-check-dump | rdb 文件检查工具   |
| redis-sentinel   | 哨兵模式工具       |

在第一章里面已经将这些可执行文件配置到了全局变量里面，可以在控制台直接输入执行

## 执行

::: code-group

```bash [简单执行]
redis-server
```

```bash [修改端口号]
redis-server --port 1234

# 默认是 6379
```

```bash [守护进程模式运行]
redis-server --daemonize yes
```

```bash [查看运行进程]
ps -ef | grep -i redis

[chenwei@VIVIICHEN-MC0 bin (stable)]$ ps -ef | grep -i redis
  501  6366     1   0 11:28PM ??         0:00.05 redis-server *:6379
  501  6403 35690   0 11:28PM ttys000    0:00.00 grep -i redis
```

:::

## 停止

考虑到 redis 有可能正在将内存中的数据同步到硬盘中，强制终止 redis 进程可能会导致数据丢失

所有正确停止 redis 的方式应该是向 redis 发送 shutdown 命令

```bash
redis-cli shutdown
```

当 redis 手动 shutdown 命令后，会先断开所有客户端连接，然后根据配置执行持久化，最后完成退出

redis 可以妥善处理 sigterm 信号，所有使用 kill redis 进程的 pid 也可以正常结束 redis,效果与发送 shutdown 命令一样

```bash
kill -9 4684(pid)

[chenwei@VIVIICHEN-MC0 bin (stable)]$ redis-server --daemonize yes
[chenwei@VIVIICHEN-MC0 bin (stable)]$ ps -ef | grep -i redis
  501  9745     1   0 11:36PM ??         0:00.03 redis-server *:6379
  501  9775 35690   0 11:36PM ttys000    0:00.00 grep -i redis
[chenwei@VIVIICHEN-MC0 bin (stable)]$ kill -9 9745
[chenwei@VIVIICHEN-MC0 bin (stable)]$ ps -ef | grep -i redis
  501  9892 35690   0 11:36PM ttys000    0:00.00 grep -i redis
```

## 连接

redis-cli 是 redis 自带的基于命令行的 redis 命令行客户端

运行 redis-cli 即可连接数据库

::: code-group

```bash [直接连接]
redis-cli
```

```bash [指定地址与端口]
redis-cli -h 127.0.0.1 -p 1234
```

```bash [开启、连接并存储]
[chenwei@VIVIICHEN-MC0 bin (stable)]$ redis-server --daemonize yes
[chenwei@VIVIICHEN-MC0 bin (stable)]$ redis-cli
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> SET foo chenwei
OK
127.0.0.1:6379> GET foo
"chenwei"
127.0.0.1:6379>
```

```bash [ping 验证连接]
127.0.0.1:6379> ping
PONG # 如果是 PONG 则证明连接成功
```

```bash [断开连接]
命令： quit

快捷键：ctrl + c

```

:::

## 配置文件

由于可配置的选项较多，通过启动参数设置这些选项并不方便，所以 redis 支持通过配置文件来设置这些选项

redis 提供了一个配置文件的模版 redis.conf，位于源代码目录的根目录

建议把文件放在 /etc/redis 目录中，以端口号命名，如：6379.conf

::: code-group

```bash [通过配置文件运行]
[chenwei@VIVIICHEN-MC0 redis]$ redis-server ./6379.conf
[chenwei@VIVIICHEN-MC0 redis]$ cat 6379.conf
port 6379
daemonize yes
[chenwei@VIVIICHEN-MC0 redis]$ ps -ef | grep -i redis
  501 24577     1   0 12:06AM ??         0:00.14 redis-server *:6379
  501 24733 22907   0 12:06AM ttys000    0:00.00 grep -i redis
[chenwei@VIVIICHEN-MC0 redis]$ pwd
/etc/redis
[chenwei@VIVIICHEN-MC0 redis]$ ls
6379.conf
```

:::

通过启动参数传递同名的配置选项会覆盖配置文件中的响应参数：

```bash
[chenwei@VIVIICHEN-MC0 redis]$ redis-server ./6379.conf --port 2238
[chenwei@VIVIICHEN-MC0 redis]$ ps -ef | grep -i redis
  501 27991     1   0 12:14AM ??         0:00.03 redis-server *:2238
  501 28009 22907   0 12:14AM ttys000    0:00.00 grep -i redis
```

### 运行时更改 redis 配置

还可以在 redis 运行时通过 CONFIG SET 命令在不重新启动 redis 的情况下动态修改部分 redis 配置

::: code-group

```bash [SET 设置]
CONFIG SET logLevel warning
```

```sql [GET 拿]
CONFIG GET logLevel

127.0.0.1:6379> CONFIG GET logLevel
1) "loglevel"
2) "notice"
127.0.0.1:6379> CONFIG GET port
1) "port"
2) "6379"
127.0.0.1:6379> CONFIG SET logLevel warning
OK
127.0.0.1:6379> CONFIG GET logLevel
1) "loglevel"
2) "warning"
```

:::

## 多数据库

一个 redis 示例提供了多个用来存储数据的字典，客户端可以指定将数据存储在哪个字典中。

这与在一个关系数据库中可以创建多个数据库类似

redis 默认支持 16 个数据库，分别编号 0 1 2 3 ... 14 15

- redis 不支持自定义数据库名字
- 因为每个数据库都以编号命名，所以开发者必须要明确哪个数据库放了哪些数据
- 可以通过配置参数 databases 修改支持的数据库个数

每个数据库都是独立的，也就是说在 0 号数据库中插入的数据在 1 号数据库是访问不到的

客户端与 redis 建立连接后自动选择 0 号数据库，可以使用 SELECT 更换数据库

> 当选择的数据库编号超过最大数据库编号时，选择默认编号的数据库

```bash
127.0.0.1:6379> SELECT 1
OK
127.0.0.1:6379[1]> SET foo chenwei
OK
127.0.0.1:6379[1]> GET foo
"chenwei"
127.0.0.1:6379[1]> SELECT 0
OK
127.0.0.1:6379> keys *
(empty array)
```

::: warning
redis 不支持为每个数据库设置不同的访问密码，所有一个客户端要么可以访问全部数据库，要么一个数据库也没有权限
:::

最重要的一点是多个数据库之间并不是完全隔离的，比如 FLUSHALL 命令可以清空一个 redis 实例中所有数据库中数据

因此，这些数据库更像是一个命名空间，而不适合存储不通应用程序的数据，这是非常不推荐的做法

`不同的应用应该使用不同的 redis 实例存储数据`，由于 redis 非常轻量级，一个空的 redis 占用的内存只有 1mb，所以不用担心多个 redis 实例会额外占用很多内存的问题

> 就是用 redis-servers 启用另一个服务
