---
title: redis - 命令
---

# 命令

## 通用命令

```bash
# 返回所有key
KEYS *

# 返回所有以 my 开头的 key
KEYS my*

# 获取 key 的类型
TYPE key

# 查询某个 key 是否存在
EXISTS key [key ...]

# 将 key 改名为 newkey
RENAME key newkey

# 从当前数据库中随机返回（不删除）一个key
RANDOMKEY

# 清空当前数据库所有内容
FLUSHDB

# 清空所有数据库内容
FLUSHALL
```
