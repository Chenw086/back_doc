---
title: redis - 数据类型
---

# 数据类型

redis 不是简单的键值存储，它实际上是一个数据结构服务器，支持不同类型的值。这意味着在传统键值存储中，讲字符串键与字符串值相关联，而在 redis 中，该值不仅限于简单的字符串，还可以容纳更复杂的数据结构。

| 类型         | 说明                                                                                                                                                    |
| :----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| String       | 字符串                                                                                                                                                  |
| Hash         | 散列，是由与值相关联的字段组成的内容。字段和值都是字符串，类似于 js 中的对象结构                                                                        |
| List         | 列表，根据插入顺序排列的字符串元素的集合。它们基本上是链表                                                                                              |
| Set          | 未排序的字符串元素集合，集合中的数据是不重复的                                                                                                          |
| ZSet         | 与 Set 类似，但每个字符串元素都与一个称为分数的浮点值相关联。元素总是按它们的分数排列，因此与 Sets 不同，可以检索一系列元素（例如：给我前十名或后十名） |
| Bit array    | 可以使用特殊命令像位数组一样的处理字符串值，可以设置和清楚单个位，计数所有设置为 1 的位，找到第一个设置或未设置的位，依此类推                           |
| HyperLogLogs | 这是一个概率数据结构，用于估计集合的基数                                                                                                                |
| Stream       | 提供抽象日志数据类型的类似地图项的仅追加集合                                                                                                            |

**Redis 中的键**

redis 密钥是二进制安全的，意味着可以使用任何二进制序列作为 key，从 "foo" 之类的字符串到 jpeg 文件的内容

空字符串也是有效的键

一些其余的规则：

- 太长不好，占用内存空间
- 太短不好，没有可读性
- 尝试坚持使用固定规则：
  - object-type:id
  - user:1000
  - 点或破折号通常用于多字字段，例如：comment\:1234\:reply.to 或 comment\:1234\:reply-to
  - 允许最大大小为 512MB

## 字符串

字符串类型是 Redis 中最基本的数据类型，也是其他数据类型的基础

- 能存储任何形式的字符串，包括二进制数据
- 可以用它存储用户的邮箱、JSON 化的对象，甚至是一张图片
- value 最多可以容纳大小为 512MB

字符串类型是其他常见四种数据类型的基础，其他数据类型和字符串类型的差别从某种角度来说只是组织字符串的形式不同

例如：列表类型是以列表的形式组织字符串，而集合类型是以集合的形式组织字符串

**CURD**

::: code-group

```bash [添加]
# 设置值
127.0.0.1:6379> SET foo bar
OK

# 拿到所有键值
127.0.0.1:6379> KEYS *
1) "foo"

# 取值
127.0.0.1:6379> GET foo
"bar"

# 设置新值返回旧值
127.0.0.1:6379> GETSET foo baz
"bar"

# 只有不存在的时才设置key的值
127.0.0.1:6379> SETNX foo hello
(integer) 0
127.0.0.1:6379> SETNX foo1 hello
(integer) 1
127.0.0.1:6379> GET foo1
"hello"
127.0.0.1:6379> SETNX foo1 chenwei
(integer) 0

# SET 始终会设置
127.0.0.1:6379> SET foo hello
OK
127.0.0.1:6379> GET foo
"hello"

# 一次性创建多个值
127.0.0.1:6379> MSET foo2 chen foo3 wei
OK
127.0.0.1:6379>  KEYS *
1) "foo1"
2) "foo"
3) "foo3"
4) "foo2"

# 追加内容
127.0.0.1:6379> SET chen wei
OK
127.0.0.1:6379> APPEND chen vi
(integer) 5
127.0.0.1:6379> GET chen
"weivi"

```

```bash [查询]
# 查询值
127.0.0.1:6379> GET foo
"hello"

# 查询子字符串
127.0.0.1:6379> GETRANGE foo 1 2
"el"

# 查询多个
127.0.0.1:6379> MGET foo foo1 foo2
1) "hello"
2) "hello"
3) "chen"

# 查询值的长度
127.0.0.1:6379> STRLEN foo
(integer) 5

# 查询是否存在
127.0.0.1:6379> EXISTS chen
(integer) 1
127.0.0.1:6379> EXISTS wei
(integer) 0

# 查询多个键是否存在，并返回有多少
127.0.0.1:6379> EXISTS chen wei foo foo1
(integer) 3

# 查询键对应值的类型
127.0.0.1:6379> TYPE chen
string
```

```bash [修改]
# 设置置顶的 key
SET key value

# 设置值，并返回旧值
GETSET key value

# key 已经存在并且值是一个字符串，会在字符串末尾插入内容
APPEND KEY VALUE
```

```bash [删除]
DEL key [key ...]

127.0.0.1:6379>  KEYS *
1) "foo1"
2) "foo"
3) "chen"
4) "foo2"
5) "foo3"
127.0.0.1:6379> DEL foo1 foo2 foo3
(integer) 3
127.0.0.1:6379> KEYS *
1) "foo"
2) "chen"
```

:::

## 数字值

数字值在 redis 中以字符串保存

```bash
# 设置
127.0.0.1:6379> SET count 1
OK
127.0.0.1:6379> GET count
"1"

# 存储的数字值加一
127.0.0.1:6379> INCR count
(integer) 2
127.0.0.1:6379> GET count
"2"

# 存储的值加上给定的增量
127.0.0.1:6379> INCRBY count 3
(integer) 5
127.0.0.1:6379> GET count
"5"

# 存储的数字值减一
127.0.0.1:6379> DECR count
(integer) 4

# 存储的值减去给定的减量
127.0.0.1:6379> DECRBY count 2
(integer) 2
```

## 哈希

一种字段结构，存储了字段和字段值的映射，但字符值只能是字符串，不能其他数据类型

> 除了哈希，redis 其它数据类型同样不支持数据类型嵌套

**CURD**

::: code-group

```bash [添加]
# 往 hash 表存值
127.0.0.1:6379> HSET myhash a 1 b 2
(integer) 2

# 查看哈希表中所有字段
127.0.0.1:6379> HKEYS myhash
1) "a"
2) "b"

# 取哈希表中指定值
127.0.0.1:6379> HGET myhash a
"1"
127.0.0.1:6379> HGET myhash b
"2"

# 如果不存在就创建字段值
127.0.0.1:6379> HSETNX myhash c 3 c 4
(error) ERR wrong number of arguments for 'hsetnx' command
127.0.0.1:6379> HSETNX myhash c 3
(integer) 1
127.0.0.1:6379> HSETNX myhash d 4
(integer) 1
127.0.0.1:6379> HSETNX myhash d 5
(integer) 0
127.0.0.1:6379> HGET myhash d
"4"
```

```bash [查询]
# 查看所有键
127.0.0.1:6379> HKEYS myhash
1) "a"
2) "b"
3) "c"
4) "d"

# 获取哈希表中字段的数量
127.0.0.1:6379> HLEN myhash
(integer) 4

# 获取所有给定字段的值
127.0.0.1:6379> HMGET myhash a b
1) "1"
2) "2"
127.0.0.1:6379> HGET myhash a
"1"

# 获取哈希表中指定 key 的所有字段和值
127.0.0.1:6379> HGETALL myhash
1) "a"
2) "1"
3) "b"
4) "2"
5) "c"
6) "3"
7) "d"
8) "4"

# 查看哈希表key中，指定字段是否存在
127.0.0.1:6379> HEXISTS myhash a
(integer) 1
127.0.0.1:6379> HEXISTS myhash e
(integer) 0

# 获取哈希表中所有所有值
127.0.0.1:6379> HVALS myhash
1) "1"
2) "2"
3) "3"
4) "4"
```

```bash [修改]
# 将哈希表 key 中的字段 field 的值设置为 value
HSET key field value [field value ...]

# 为哈希表 key 中指定字段的整数值加上增量 increment
HINCRBY key field increment

# 因为没有写的权限，所有这里报错了
127.0.0.1:6379> HINCRBY myhash b 2
(error) MISCONF Redis is configured to save RDB snapshots, but it is currently not able to persist on disk. Commands that may modify the data set are disabled, because this instance is configured to report errors during writes if RDB snapshotting fails (stop-writes-on-bgsave-error option). Please check the Redis logs for details about the RDB error.
127.0.0.1:6379> CONFIG SET stop-writes-on-bgsave-error no
OK
127.0.0.1:6379> HINCRBY myhash b 2
(integer) 4
```

```bash [删除]
# HDEL 删除一个或多个
HDEL key field [field1 ...]

# 删除整个数据字段
HDEL key [key1 ...]
```

:::

## 列表

列表类似于数组，可以存储一个有序的字符串列表，常用的操作就是向列表两端添加元素，或者获得列表某一个片段

列表类型的内部使用双向链表实现，所以向列表两端添加元素的时间复杂度为 o(1)，获取越接近两端元素的速度就越快

> 这种特性使列表类型非常快速的完成关系型数据库难以应付的场景：
>
> 例如社交网站新鲜事，我们关心的只是最新的内容，使用列表类型存储，即便数据长达几千万，获取最新的几百个也很快
>
> 同样因为在两端插入记录的时间复杂度是 o(1)，列表类型也适合用来记录日志，可以保证加入新日志的速度不会受到已有日志数量影响

::: details 示例

::: code-group

```bash [添加]
# 添加数据
127.0.0.1:6379> LPUSH mylist a
(integer) 1
127.0.0.1:6379> LPUSH mylist b
(integer) 2
127.0.0.1:6379> LPUSH mylist c
(integer) 3
127.0.0.1:6379> LPUSH mylist d
(integer) 4
127.0.0.1:6379> LPUSH mylist 1 2 3
(integer) 7

# 返回指定位置的数据
127.0.0.1:6379> LRANGE mylist 0 1
1) "3"
2) "2"

# 返回从开始到结尾
127.0.0.1:6379> LRANGE mylist 0 -1
1) "3"
2) "2"
3) "1"
4) "d"
5) "c"
6) "b"
7) "a"

# 最右边插入数据
127.0.0.1:6379> RPUSH mylist 1 2 3
(integer) 10
127.0.0.1:6379> LRANGE mylist 0 -1
 1) "3"
 2) "2"
 3) "1"
 4) "d"
 5) "c"
 6) "b"
 7) "a"
 8) "1"
 9) "2"
10) "3"

# 在列表元素的前后插入
127.0.0.1:6379> LINSERT mylist BEFORE a a1
(integer) 11
127.0.0.1:6379> LRANGE mylist 0 -1
 1) "3"
 2) "2"
 3) "1"
 4) "d"
 5) "c"
 6) "b"
 7) "a1"
 8) "a"
 9) "1"
10) "2"
11) "3"
127.0.0.1:6379> LINSERT mylist AFTER a a2
(integer) 12
127.0.0.1:6379> LRANGE mylist 0 -1
 1) "3"
 2) "2"
 3) "1"
 4) "d"
 5) "c"
 6) "b"
 7) "a1"
 8) "a"
 9) "a2"
10) "1"
11) "2"
12) "3"

# 修改第一位的数据，设置超出索引的字段会报错
127.0.0.1:6379> LSET mylist 0 hello
OK
127.0.0.1:6379> LRANGE mylist 0 -1
 1) "hello"
 2) "2"
 3) "1"
 4) "d"
 5) "c"
 6) "b"
 7) "a1"
 8) "a"
 9) "a2"
10) "1"
11) "2"
12) "3"
```

```bash [查询]
# 返回指定索引数据
127.0.0.1:6379> LINDEX mylist 0
"hello"

# 返回list长度
127.0.0.1:6379> LLEN mylist
(integer) 12

# 返回指定索引返回长度
127.0.0.1:6379> LRANGE mylist 0 1
1) "hello"
2) "2"
```

```bash [删除]
# 删除第一个数据
127.0.0.1:6379> LPOP mylist
"hello"

# 删除最后一个数据
127.0.0.1:6379> RPOP mylist
"3"

# 查看所有
127.0.0.1:6379> LRANGE mylist 0 -1
 1) "2"
 2) "1"
 3) "d"
 4) "c"
 5) "b"
 6) "a1"
 7) "a"
 8) "a2"
 9) "1"
10) "2"

# 插入数据，返回长度
127.0.0.1:6379> LINSERT mylist BEFORE b 2
(integer) 11
127.0.0.1:6379> LRANGE mylist 0 -1
 1) "2"
 2) "1"
 3) "d"
 4) "c"
 5) "2"
 6) "b"
 7) "a1"
 8) "a"
 9) "a2"
10) "1"
11) "2"

# 删除2 个2， 第一个2是多少个
127.0.0.1:6379> LREM mylist 2 2
(integer) 2
127.0.0.1:6379> LRANGE mylist 0 -1
1) "1"
2) "d"
3) "c"
4) "b"
5) "a1"
6) "a"
7) "a2"
8) "1"
9) "2"
```

:::

## Set

集合类型和数学中的集合概念相似，集合中的元素是唯一的、无序的，集合就是没有顺序且不重复的列表

集合与列表区别：

1. 列表是有序的，集合是无序的
2. 列表数据可以重复，集合中没有重复数据

集合类型常用操作是向集合中加入或删除元素、判断某个元素是否存在等

由于集合类型在 redis 内部是使用过值为空的散列表实现的，所以这些操作的时间复杂度都是 o(1)

最方便的是多个集合之间还可以进行交集、并集和差集运算

::: code-group

```bash [添加]
SADD key number [number ...]

127.0.0.1:6379> SADD myset a b c 1 2 3
(integer) 6
```

```bash [查询]
# 返回集合所有成员
127.0.0.1:6379> SMEMBERS myset
1) "3"
2) "2"
3) "1"
4) "c"
5) "b"
6) "a"

# 获取集合的成员数
127.0.0.1:6379> SCARD myset
(integer) 6

# 判断元素是否存在于集合
127.0.0.1:6379> SISMEMBER myset a
(integer) 1
127.0.0.1:6379> SISMEMBER myset k
(integer) 0

# 返回集合中一个或多个随机数
127.0.0.1:6379> SRANDMEMBER myset 1
1) "3"
127.0.0.1:6379> SRANDMEMBER myset 2
1) "b"
2) "1"
```

```bash [删除]
# 移除集合中一个或多个成员
127.0.0.1:6379> SREM myset a b
(integer) 2

# 移除并返回集合中一个随机元素
127.0.0.1:6379> SPOP myset
"3"
127.0.0.1:6379> SPOP myset
"c"

# 讲 member 元素从 a 集合移除到 b 集合
SMOVE a b member;
```

:::

### 集合间运算

```bash
# 返回第一个集合与其它集合之间的差异
127.0.0.1:6379> SMEMBERS myset
1) "2"
2) "1"
127.0.0.1:6379> SADD myset2 a b c 2 3
(integer) 5
127.0.0.1:6379> SDIFF myset myset2
1) "1"

# 返回所有集合的交集
127.0.0.1:6379> SINTER myset myset2
1) "2"

# 返回所有集合的并集
127.0.0.1:6379> SUNION myset myset2
1) "2"
2) "a"
3) "1"
4) "3"
5) "c"
6) "b"

# 返回所有集合差异并存储在 em 中
SDIFFSTORE em key1 [key2 ...]

# 返回所有集合交集并存储在 em 中
SINTERSTORE em key1 [key2 ...]

# 返回所有集合并集并存储在 em 中
SUNIONSTORE em key1 [key2 ...]
```

**使用场景**

跟踪一些唯一性数据

> 比如网站的唯一 IP 地址信息，每次访问网站的时候记录用户 IP 地址，set 自动保证数据的唯一不重复

充分利用 SET 聚合操作方便高效的特性，用于维护数据对象之间的关联关系

> 比如所有购买 a 商品的 id 存储到指定的 set 中，所有购买 b 商品的客户 id 存储 set 中，如果想获取同时购买这两个商品的客户 id，只需要求交集即可

## 有序集合

Sorted Set

有序集合是一种类似于集合和哈希之间的混合数据类型

- 与集合一样，排序集合由唯一的非重复字符串元素组成
- 有序集合中的元素不排序，但有序集合中的每个元素都关联了一个分数（这就是为什么类型也类似于哈希，因为每个元素都映射都一个值）
- 虽然集合中每个元素都是不同的，但是它们的分数却可以相同

每个元素都会关联一个 double 类型的分数，redis 正式通过分数来为集合中的成员进行从小到大的排序

有序集合类型在某些方面和列表类型有些相似

相同点：

1. 两者都是有序的
2. 两者都可以获得某一范围的元素

不同点：

1. 列表类型通过链表实现的，获取靠近两端的数据速度极快，而当元素增多后，访问中间数据的速度会较慢，所以它更适合实现新鲜事或日志这样的场景
2. 有序集合类似是使用哈希表实现的，所以即使读取位于中间部分的数据速度也很快
3. 列表中不嫩恶搞简单的调整某个元素的位置，但是有序集合可以（通过更改元素的分数）
4. 有序集合要比列表类型更耗费内存

有序集合的典型应用场景

1. 排行榜

   > 例如一个大型在线游戏的积分排行榜，每当玩家的分数发生变化时，可以执行 ZADD 命令更新玩家的分数，此后再通过 ZRANGE 命令获取积分 TOPTEN 的用户信息
   >
   > 当然也可以使用 ZRANK 命令通过 username 来获取玩家的排行信息
   >
   > 最后将组合使用 ZRANGE 和 ZRANK 命令快速获取某个玩家积分相近的其它用户信息

2. 微博热搜
   > 假设要获取热门的帖子或搜索。回复量越高越热门
   >
   > 如果用关系数据库 sql 很容易实现，但是数据量大的时候，效率很低，同时建立索引又要消耗大量的资源，同时增加负载
   >
   > 使用 redis 的时候，不需要存储多余的信息，只需要存储帖子 id 和回复量两个信息就可以了

::: code-group

```bash [添加]
# 向有序集合添加一个或多个成员，或者更新已存在成员分数
ZADD key score member [score member ... ]
```

```bash [查询语法]
# 通过索引区间返回有序集合指定区间内的成员，分数从低到高排序
ZRANGE key start stop [WITHSCORES]

# 通过索引区间返回有序集合指定区间内的成员，分数从高到低排序
ZREVRANGE key start stop [WITHSCORES]

# 返回有序集合指定分数区间内的成员，分数从低到高排序
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]

# 返回有序集中指定分数区间内的成员，分数从高到低排序
ZREVRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]

# 返回有序集合中指定成员的排名，有序成员按分数值（从小到大）排序
ZRANK key member

# 返回有序集合中指定成员的排名，有序集合成员按分数（从大到小）排序
ZREVRANGE key member

# 获取有序集合的成员数
ZCARD key

# 返回有序集合中，成员的分数值
ZCARD key member

# 计算在有序集合中指定区间分数的成员数
ZSCORE key member

# 计算在有序集合中指定区间分数的成员数
ZCOUNT key min max
```

```bash [示例]
127.0.0.1:6379> ZRANGE heros 0 -1
1) "chen"
2) "wei"
3) "luan"
4) "yi"
127.0.0.1:6379> ZRANGE heros 0 -1 WITHSCORES
1) "chen"
2) "70"
3) "wei"
4) "80"
5) "luan"
6) "90"
7) "yi"
8) "100"
127.0.0.1:6379> ZRANGEBYSCORE heros 60 90
1) "chen"
2) "wei"
3) "luan"
127.0.0.1:6379> ZRANK heros chen
(integer) 0
127.0.0.1:6379> ZRANK heros wei
(integer) 1
127.0.0.1:6379> ZCARD heros
(integer) 4
```

```bash [修改]
# 向有序集合添加一个或多个成员，或者更新已存在成员的分数
ZADD key score member [score member ...]

# 有序集合中对指定成员的分数加上增量 increment
ZINCRBY key increment member

127.0.0.1:6379> ZINCRBY heros -10 chen
"60"

```

```bash [删除]
# 移除有序集合中一个或多个成员
ZREM key member [member ...]

# 移除有序集合中给定的排名区间的所有成员
ZREMRANGEBYRANK key start stop

# 移除有序集合中给定的分数区间的所有成员
ZREMRANGEBYSCORE key min max

127.0.0.1:6379> ZREMRANGEBYRANK heros 0 -1
(integer) 4
127.0.0.1:6379> ZRANGE heros 0 -1
(empty array)
```

```bash [聚合计算]
# 计算给定的一个或多个有序集合的交集并将结果集存储在新的有序集合 exam
ZINTERSTORE exam numkeys key [key ...]

# 计算给定的一个或多个有序集的并集，并存储在新的key中
ZUNIONSTORE exam numkeys key [key ... ]
```

:::
