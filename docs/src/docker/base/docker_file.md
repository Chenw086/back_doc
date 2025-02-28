---
title: docker - dockerfile
---

# dockerfile

dockerfile 是一个文本文件，用于定义 Docker 镜像的构建过程。它包含了一系列的指令，用于指定镜像的构建过程。

## 基础

### FROM

语法

```dockerfile
FROM <image>[:<tag>] [AS <name>]
```

详细说明：

- 指定基础镜像，必须是第一条非注释指令
- image：基础镜像名称
- tag：镜像标签，默认 lastest
- AS name：为当前阶段命名，用于多阶段构建

参数说明：

- 可以使用任何有效的镜像名称
- 可以使用官方镜像或私有仓库镜像
- 可以使用 search 作用空白基础镜像

使用场景：

```dockerfile
# 使用官方镜像
FROM ubuntu:20.04

# 使用私有仓库镜像
FROM registry.example.com/myapp:1.0

# 多阶段构建
FROM node:14 AS builder
FROM nginx:alpine AS production

# 使用 ARG 变量
ARG VERSION=latest
FROM nginx:${VERSION}
```

建议：

- 总是指定具体版本标签
- 选择合适的基础镜像大小
- 使用官方镜像作为基础
- 考虑安全性更新

### LABEL

语法：

```dockerfile
LABEL <key>=<value> <key>=<value> ...
```

说明：

- 为镜像添加元数据
- 可以添加多个标签
- 每个标签都是键值对
- 值可以包含空格，需要用引号

场景

```dockerfile
# 基本用法
LABEL version="1.0"
LABEL description="This is my application"

# 多标签
LABEL maintainer="chenwei@example.com" \
      version="1.0" \
      description="This is my application" \
      build_date="2024-03-20"

# 组织信息
LABEL org.opencontainers.image.authors="Chen Wei" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.description="Application description"
```

查看标签

```shell
docker inspect --format='{{.Config.Labels}}' image_name
```

建议：

- 使用有意义的标签名
- 保持一致的命名规范
- 包含重要的元信息
- 使用反向域名标注法

### ARG

语法

```dockerfile
ARG <name>[=<default value>]
```

说明

- 定义构建时变量
- 只在构建过程中可用
- 可以设置默认值
- 可以被构建命令覆盖
- 不会保存在最终镜像中

作用范围：

- 仅在构建时有效
- 不会持久化到镜像中
- 每个构建阶段都需要重新声明

使用场景

```dockerfile
# 基本用法
ARG VERSION=latest
ARG BUILD_DATE
ARG CODE_VERSION=1.0.0

# 在 FROM 中使用
ARG VERSION
FROM nginx:${VERSION}

# 条件构建
ARG ENV=prod
RUN if [ "$ENV" = "dev" ]; then \
        npm install; \
    else \
        npm install --production; \
    fi

# 多个参数
ARG USER=myuser
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID $USER && \
    useradd -u $UID -g $GID $USER
```

构建时传递参数

```bash
docker build --build-arg VERSION=1.0 .
docker build --build-arg ENV=dev .
```

建议

- 为所有参数提供默认值
- 使用有意义的参数名
- 注意安全性（不要传递敏感信息）
- 合理使用条件构建

### ENV

语法

```dockerfile
ENV <key>=<value> ...
ENV <key> <value>
```

说明

```dockerfile
# 基本用法
ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy

# 多个环境变量
ENV NGINX_VERSION=1.19.0 \
    NODE_VERSION=14 \
    PATH=$PATH:/usr/local/nginx/bin

# 应用配置
ENV APP_HOME=/app \
    APP_PORT=3000 \
    NODE_ENV=production \
    DEBUG=false

# 系统配置
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    TZ=Asia/Shanghai

# 在其他指令中使用
WORKDIR ${APP_HOME}
RUN echo $NODE_ENV
```

运行时修改

```bash
docker run -e "NODE_ENV=development" myimage
docker run --env-file ./env.list myimage
```

建议

- 使用有意义的变量名
- 分组相关变量
- 注意安全性（不存储敏感信息）
- 提供合理的默认值
- 考虑运行时可覆盖性

### WORKDIR

语法

```dockerfile
WORKDIR /path/to/workdir
```

说明

- 设置工作目录
- 影响后续指令的工作路径
- 可以使用绝对或相对路径
- 如果目录不存在会自动创建
- 支持使用环境变量

作用范围

- 影响 RUN
- 影响 CMD
- 影响 ENTRYPOINT
- 影响 COPY
- 影响 ADD

使用场景

```dockerfile
# 基本用法
WORKDIR /app

# 使用环境变量
ENV APP_HOME=/app
WORKDIR ${APP_HOME}

# 多层级目录
WORKDIR /app
WORKDIR src
WORKDIR config
# 最终工作目录是 /app/src/config

# 应用示例
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]

# 多阶段构建中使用
FROM node:14 AS builder
WORKDIR /build
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /build/dist .
```

### COPY

语法

```dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

说明

- 复制本地文件到镜像
- 支持多个源文件
- 支持通配符
- 目标路径不存在会自动创建
- 保留文件元数据（权限、时间戳等

参数说明

- --chown: 设置文件所属户和组
- src：源文件路径（相对于构建上下文）
- dest：目标路径（容器内）

使用场景

```dockerfile
# 基本用法
COPY file.txt /app/
COPY file1.txt file2.txt /app/

# 使用通配符
COPY *.txt /app/
COPY app* /app/

# 设置权限
COPY --chown=user:group files* /app/

# 多阶段构建
COPY --from=builder /app/dist /usr/share/nginx/html/

# 复制目录
COPY ./src /app/src/

# 使用通配符和排除
COPY package*.json ./
```

建议

- 优先使用 COPY 而不是 ADD
- 合理使用 .dockerignore
- 注意文件权限
- 考虑缓存优化

### ADD

语法

```dockerfile
ADD [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

说明

- 类似 COPY，但功能更强大
- 支持 URL 下载
- 自动解压压缩文件
- 支持本地 tar 提取

使用场景

```dockerfile
# 从 URL 下载
ADD https://example.com/file.tar.gz /app/

# 自动解压
ADD source.tar.gz /app/

# 设置权限
ADD --chown=user:group files* /app/

# 复制并解压
ADD app.tar.gz /usr/src/app/

# 下载远程文件
ADD https://example.com/config.json /app/
```

建议

- 除非需要自动解压，否则使用 COPY
- 注意远程文件的安全性
- 考虑缓存影响
- 避免使用 ADD 下载可执行文件

### RUN

语法

```dockerfile
RUN <command>                  # shell 格式
RUN ["executable", "param1", "param2"]  # exec 格式
```

说明

- 在构建时执行命令
- 创建新的镜像层
- 可以执行任何 shell 命令
- 支持多行命令

两种格式

1. shell

- 使用 /bin/sh -c 执行
- 支持 shell 特性（管道、重定向等）

2. Exec

- 直接执行程序
- 不会调用 shell
- 参数需要单独引号

使用场景

```dockerfile
# 基本 shell 格式
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# exec 格式
RUN ["apt-get", "install", "-y", "nginx"]

# 多行命令
RUN set -ex; \
    apt-get update; \
    apt-get install -y \
        curl \
        nginx \
        nodejs; \
    rm -rf /var/lib/apt/lists/*

# 条件执行
RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install; \
    else \
        npm install --production; \
    fi

# 创建用户和组
RUN groupadd -r appgroup && \
    useradd -r -g appgroup appuser

# 设置权限
RUN mkdir -p /app && \
    chown -R appuser:appgroup /app
```

建议

- 合并多个 RUN 指令
- 清理不必要的文件
- 使用 && 连接命令
- 注意缓存机制
- 合理分层

### CMD

语法

```dockerfile
CMD ["executable","param1","param2"]  # exec 格式（推荐）
CMD command param1 param2             # shell 格式
CMD ["param1","param2"]              # 作为 ENTRYPOINT 的默认参数
```

说明

- 容器启动时的默认命令
- 可以被 docker run 命令行参数覆盖
- 一个 Dockerfile 中只有最后一个 CMD 生效
- 如果有 ENTRYPOINT，CMD 会作为参数

使用场景

```dockerfile
# 基本用法
CMD ["nginx", "-g", "daemon off;"]

# 使用 shell 格式
CMD echo "Hello World"

# 作为 ENTRYPOINT 参数
ENTRYPOINT ["npm"]
CMD ["start"]

# 启动应用
CMD ["node", "app.js"]

# 带环境变量
CMD ["sh", "-c", "node app.js"]
```

建议

- 优先使用 exec 格式
- 提供合理的默认值
- 考虑与 ENTRYPOINT 的配合
- 注意参数可被覆盖的特性

### ENTRYPOINT

语法

```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]  # exec 格式（推荐）
ENTRYPOINT command param1 param2               # shell 格式
```

说明

- 设置容器启动时执行的命令
- 不会被 docker run 的命令行参数覆盖
- 可以被 --entrypoint 参数覆盖

与 CMD 区别

- ENTRYPOINT 不容易被覆盖
- ENTRYPOINT 可以接收 CMD 或运行参数
- 更适合作为可执行容器

使用场景

```dockerfile
# 基本用法
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# 结合 CMD
ENTRYPOINT ["npm"]
CMD ["start"]

# 使用脚本
COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

# 参数处理
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
```

建议

- 使用 exec 格式
- 提供初始化脚本
- 处理信号量
- 考虑配置灵活性

### EXPOSE

语法

```dockerfile
EXPOSE <port> [<port>/<protocol>...]
```

说明

- 声明容器运行时监听的端口
- 仅作为文档说明，不会自动开放端口
- 可以指定端口和协议
- 实际端口映射在运行时指定

协议类型

- tcp（默认）
- udp
- sctp

使用场景

```dockerfile
# 基本用法
EXPOSE 80

# 指定协议
EXPOSE 80/tcp
EXPOSE 53/udp

# 多个端口
EXPOSE 80 443
EXPOSE 3000-3999

# 常见应用
# Web 服务器
EXPOSE 80 443
# Node.js 应用
EXPOSE 3000
# MySQL
EXPOSE 3306
# MongoDB
EXPOSE 27017
```

运行时映射

```bash
# 使用 -p 映射具体端口
docker run -p 8080:80 myapp

# 使用 -P 自动映射所有暴露端口
docker run -P myapp
```

建议

- 明确声明所需端口
- 使用标准端口号
- 注意安全性考虑
- 文档化端口用途

### VOLUME

语法

```dockerfile
VOLUME ["/data"]
VOLUME /data
```

详细说明

- 创建挂载点
- 用于持久化数据
- 可以在运行时挂载主机目录
- 容器删除时目录保留

数据类型

- 持久化数据
- 共享数据
- 配置文件
- 日志文件

使用场景

```dockerfile
# 单个挂载点
VOLUME /data

# 多个挂载点
VOLUME ["/data", "/var/log", "/etc/nginx"]

# 数据库存储
VOLUME /var/lib/mysql

# 应用数据
VOLUME ["/app/data", "/app/logs"]

# 配置文件
VOLUME /etc/nginx/conf.d
```

运行时挂载

```bash
# 命名卷
docker run -v mydata:/data myapp

# 主机目录
docker run -v /host/path:/container/path myapp

# 临时卷
docker run -v /data myapp
```

建议

- 明确声明数据目录
- 考虑数据备份
- 注意权限设置
- 文档化数据结构

### USER

语法

```dockerfile
USER <user>[:<group>]
USER <UID>[:<GID>]
```

说明

- 指定运行容器时的用户
- 影响后续的 RUN、CMD、ENTRYPOINT 指令
- 可以使用用户名或 UID
- 可以指定用户组

使用场景

```dockerfile
# 使用用户名
USER nginx

# 使用 UID
USER 1000

# 指定用户和组
USER user:group

# 创建并使用用户
RUN useradd -r -g appgroup appuser
USER appuser

# 完整示例
RUN groupadd -r appgroup && \
    useradd -r -g appgroup appuser && \
    mkdir -p /app && \
    chown -R appuser:appgroup /app
USER appuser
WORKDIR /app
```

建议

- 避免使用 root 用户
- 创建专门的应用用户
- 设置适当的权限
- 考虑安全性

### HEALTHCHECK

语法

```dockerfile
HEALTHCHECK [OPTIONS] CMD command
HEALTHCHECK NONE  # 禁用从基础镜像继承的检查
```

说明

- --interval=DURATION (默认: 30s)
- --timeout=DURATION (默认: 30s)
- --start-period=DURATION (默认: 0s)
- --retries=N (默认: 3)

使用场景

```dockerfile
# 基本 HTTP 检查
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

# 自定义脚本检查
HEALTHCHECK --interval=5m --timeout=3s \
    CMD /healthcheck.sh

# 检查 Web 服务
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -q --spider http://localhost:3000/health || exit 1

# 数据库检查
HEALTHCHECK --interval=5s --timeout=3s \
    CMD mysqladmin ping -h localhost || exit 1
```

返回值

- 0: 成功（healthy）
- 1: 失败（unhealthy）
- 2: 保留（reserved）

建议

- 设置合适的时间间隔
- 实现轻量级检查
- 包含关键功能检查
- 处理超时情况

### SHELL

语法

```dockerfile
SHELL ["executable", "parameters"]
```

说明

- 设置默认 shell
- 影响 RUN、CMD、ENTRYPOINT 的 shell 格式
- 可以多次使用

使用场景

```dockerfile
# 设置默认 shell
SHELL ["/bin/bash", "-c"]

# Windows 示例
SHELL ["powershell", "-command"]

# 切换 shell
SHELL ["/bin/bash", "-c"]
RUN echo hello
SHELL ["/bin/sh", "-c"]
RUN echo hello
```

建议

- 明确指定 shell
- 考虑跨平台兼容性
- 注意影响性能

### STOPSIGNAL

语法

```dockerfile
STOPSIGNAL signal
```

说明

- 设置停止容器时发送的信号
- 可以使用信号名称或数字
- 默认为 SIGTERM

使用场景

```dockerfile
# 使用信号名
STOPSIGNAL SIGTERM

# 使用信号数字
STOPSIGNAL 15

# 优雅关闭
STOPSIGNAL SIGQUIT
```

建议

- 选择合适的信号
- 考虑应用特性
- 实现优雅关闭
