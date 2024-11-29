---
title: 开始
---

# 开始

::: danger 相关链接
😛 [redis 中文网](https://www.redis.net.cn/)

😎 [linux 盘符区分](https://blog.csdn.net/qq_35781732/article/details/83795737)

[守护进程启动](https://blog.csdn.net/adley_app/article/details/82831948)

:::

## 规范

1. 在 redis 中不区分大小写，也就是 SET key value 与 set key value 是一样的，但是约定使用大写表示它是一个 redis 命令

## 环境配置

**macOS 安装**

::: code-group

```bash [卸载]
brew uninstall redis
```

```bash [安装]
brew install redis@6.2
```

```bash [启动]
brew services start redis@6.2

```

```BASH [检查]
brew services info redis@6.2
```

```bash [查看安装地址]
[chenwei@VIVIICHEN-MC0 bin (stable)]$ which redis-server
/opt/homebrew/Cellar/redis@6.2/6.2.14/bin/redis-server

# 或者

[chenwei@VIVIICHEN-MC0 bin (stable)]$ brew info redis
==> redis: stable 7.2.5 (bottled), HEAD
Persistent key-value database, with built-in net interface
https://redis.io/
Not installed
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/r/redis.rb
License: BSD-3-Clause
==> Dependencies
Required: openssl@3 ✔
==> Options
--HEAD
        Install HEAD version
==> Caveats
To start redis now and restart at login:
  brew services start redis
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/redis/bin/redis-server /opt/homebrew/etc/redis.conf
==> Analytics
install: 31,776 (30 days), 73,310 (90 days), 354,880 (365 days)
install-on-request: 31,349 (30 days), 72,250 (90 days), 349,698 (365 days)
build-error: 23 (30 days)

```

```bash [环境变量]
echo 'export PATH="/opt/homebrew/Cellar/redis@6.2/6.2.14:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

```bash [redis-cli 查看信息]
redis-cli info server
```

:::

另外还要配置系统服务与环境变量

**linux 安装**

## 基础介绍

**数据类型**

| 类型   | 说明                                                                                                                                                    |
| :----- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| String | 字符串                                                                                                                                                  |
| Hash   | 散列，是由与值相关联的字段组成的内容。字段和值都是字符串，类似于 js 中的对象结构                                                                        |
| List   | 列表，根据插入顺序排列的字符串元素的集合。它们基本上是链表                                                                                              |
| Set    | 未排序的字符串元素集合，集合中的数据是不重复的                                                                                                          |
| ZSet   | 与 Set 类似，但每个字符串元素都与一个称为分数的浮点值相关联。元素总是按它们的分数排列，因此与 Sets 不同，可以检索一系列元素（例如：给我前十名或后十名） |

**内存存储与持久化**

Redis 数据库中所有数据都存储在内存中，相对于磁盘，内存数据的读写要快很多

将数据存储在内存中也有问题，比如程序退出后内存中的数据会丢失。不过 redis 提供了对持久化的支持，既可以将内存中的数据异步写入到磁盘中，同时不影响继续提供服务

**功能介绍**

- 作为缓存系统

Redis 可以为每个键设置生存时间，生存时间到期后会自动被删除。这一功能能配合出色的性能让 Redis 可以作为缓存来使用。作为缓存系统，Redis 还可以限定数据占用的最大空间，在数据到达空间限制后可以按照一定的规则自动淘汰不需要的键

- 作为队列系统

除此之外，Redis 的列表类型键可以用来实现队列，并且支持阻塞式读取，可以很容易的实现一个高性能的优先级队列

- 发布/订阅功能

同时在更高层面上，Redis 还支持发布订阅的消息模式，可以基于此构建聊天室系统

**简单丰富**

例如在关系型数据库获取 posts 表内 id = 1 的记录中 title 字段

```sql
select title from posts where id = 1;
```

而在 Redis 中，读取键名为 post：1 的散列类型的 title 字段的值

```sql
HGET post:1 title
```

**使用场景**

redis 特点：

- 读写性能优异
- 持久化
- 数据类型丰富
- 单线程
- 数据自动过期
- 发布订阅
- 分布式

根绝不同场景、维度介绍：

1. 缓存系统
2. 排行榜（redis 提供的有序集合数据类结构能实现各种复杂的排行榜应用）
3. 计数器（redis 提供的 incr 命令来实现计数器功能，内存操作，性能非常好，非常适用于这些计数场景）
4. 分布式会话（当应用增加相对复杂的系统中，一般都会搭建以 redis 等内存数据库为中心的 session 服务，session 不再由容器管理，而是由 session 服务及内存数据库管理）
5. 分布式锁（可以利用 redis 的 setnx 功能来编写分布式锁）
6. 社交网络
7. 最新列表（redis 列表结构，lpush 可以在列表头部插入一个 id 作为关键字，ltrim 可用来限制列表的数量，这样列表永远为 N 个 ID，无需查询最新的列表，直接根据 id 去到对应的内容页即可）
8. 消息系统（redis 提供发布订阅及阻塞队列功能，能实现一个简单的消息队列系统。另外，这个不能和专业的消息中间件相比）

示例：秒杀和 redis 结合

秒杀经常出现的问题：

- 并发太高导致程序阻塞
- 库存无法有效控制，出现超卖的情况

解决方案：

- 数据尽量缓存，阻断用户和数据库的直接交互
- 通过锁来控制避免超卖现象

具体步骤：

1. 提前预热数据，放入 redis
2. 商品列表放入 redis list
3. 商品的详情数据 redis hash 保存，设置过期时间
4. 商品的库存数据 redis sorted set 保存
5. 用户地址信息 redis set 保存
6. 订单产生扣库存通过 redis 制造分布式锁，库存同步扣除
7. 订单产生后发货的数据，产生 redis list，通过消息队列处理
8. 秒杀结束后，再把 redis 数据和数据库进行同步
