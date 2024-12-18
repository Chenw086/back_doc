---
title: docker - 最佳实践
---

# 最佳实践

![最佳实践](./img/best/best__2024-12-18-02-22-00.png)

```shell
# 这里面就涉及到网络、存储、配置、环境变量
docker run -d -p 3306:3306 \
-v /app/myconf:/etc/mysql/conf.d \
-v /app/mydata:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:8.0.37-debian
```
