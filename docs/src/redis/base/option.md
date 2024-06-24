---
title: redis - 参数
---

# 参数

## 过期时间

::: code-group

```bash [语法]
# 为给定 key 设置生存时间，当 key 过期时 （生存时间为 0），会自动删除
EXPIRE key seconds

# 和 EXPIRE 一样，但是它以毫秒为单位
PEXPIRE key milliseconds

# EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置生存时间
# 不同点在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳 （unix timestamp）
EXPIREAT key timestamp

# 这个命令和 EXPIREAT 命令类似，但它以毫秒为单位设置 key 的过期时间戳，而不是 EXPIREAT 那样，以秒为单位
PEXPIREAT key milliseconds-timestamp
```

```bash [示例]
127.0.0.1:6379> SET foo bar
OK
127.0.0.1:6379> EXPIRE foo 10
(integer) 1
127.0.0.1:6379> GET foo
"bar"
127.0.0.1:6379> GET foo
(nil)
127.0.0.1:6379> KEYS *
(empty array)

# 查看剩余的过期时间
127.0.0.1:6379> SET foo bar
OK
127.0.0.1:6379> EXPIRE foo 20
(integer) 1
127.0.0.1:6379> TTL foo
(integer) 14
127.0.0.1:6379> TTL foo
(integer) 12
127.0.0.1:6379> GET foo
(nil)
```

```bash [获取过期时间]
# 以秒为单位，返回给定 key 的剩余生存时间
# 对某个键重新执行该命令可以修改过期时间
TTL key

# 类似于 TTL，但是以毫秒返回 key 的剩余生存时间
PTTL key
```

```bash [清除过期时间]
PERSIST key

127.0.0.1:6379> SET foo bar
OK
127.0.0.1:6379> EXPIRE foo 1000
(integer) 1
127.0.0.1:6379> TTL foo
(integer) 995
127.0.0.1:6379> PERSIST foo
(integer) 1
127.0.0.1:6379> TTL foo
(integer) -1
127.0.0.1:6379> KEYS *
1) "foo"
```

:::

上面四个命令指示单位和表现形式上的不同，但实际上 EXPIRE、PEXPIRE 和 EXPIREAT 命令的执行最后都会使用 PEXPIREAT 来实行

比如使用 EXPIRE 来设置 KEY 的生存时间为 N 秒：

1. 调用 PEXPOIRE 命令把 N 秒转换为 M 毫秒
2. 获取当前的 UNIX 时间单位也就是毫秒
3. 把当前 UNIX 时间加上 M 毫秒传递给 PEXPIREAT

另外给键设置了过期时间，这个时间保存在一个字典里，也是键值结构，键是一个指针，指向真实的键，而值是一个长整形的 UNIX 时间

过期时间返回值说明

| 值  | 说明                               |
| :-- | ---------------------------------- |
| -2  | 过期且删除                         |
| -1  | 没有设置过期时间，永不过期         |
| >0  | 表示距离过期时间还剩多少秒或者毫秒 |
