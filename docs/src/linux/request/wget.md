---
title: linux - wget
---

::: warning 来源
[wget 掘金](https://juejin.cn/post/7026184288198459406?searchId=20231218161947424F2D95AF6A886A4545)

文章很好，但是怕作者删除，所以抄录一份
:::

# wget

wget 命令是 Linux 系统用于从 Web 下载文件的命令行工具，支持 HTTP、HTTPS 及 FTP 协议下载文件，而且 wget 还提供了很多选项，例如下载多个文件、后台下载，使用代理等等，使用非常方便

- 语法格式

```shell
wget [选项] [URL]
```

例如，使用 wget 下载 redis 的 tar.gz 文件：

```shell
wget https://download.redis.io/releases/redis-7.4.1.tar.gz
```

该命令会下载文件到当前工作目录中，在下载过程中，会显示进度条、文件大小、下载速度等

## -O

要以其他名称保存下载的文件，使用 `-O` 选项，例如：

```shell
wget -O redis.tar.gz https://download.redis.io/releases/redis-7.4.1.tar.gz
```

该命令会下载文件到当前工作目录中，并将其保存为 `redis.tar.gz` 文件

## -P

要指定下载文件的保存目录，使用 `-P` 选项，例如：

```shell
wget -P /opt/redis https://download.redis.io/releases/redis-7.4.1.tar.gz
```

该命令会下载文件到 `/opt/redis` 目录中，并将其保存为 `redis-7.4.1.tar.gz` 文件

## -c

要继续下载中断的文件，使用 `-c` 选项，例如：

```shell
wget -c https://download.redis.io/releases/redis-7.4.1.tar.gz
```

该命令会继续下载中断的文件，如果文件已经存在，则不会重新下载

## -b

要后台下载文件，使用 `-b` 选项，例如：

```shell
wget -b https://download.redis.io/releases/redis-7.4.1.tar.gz
```

默认情况下，下载过程日志重定向到当前目录中的 wget-log 文件中，要查看下载状态，可以使用 tail -f wget-log 查看

## -i

如果先要一次下载多个文件，首先需要创建一个文本文件，并将所有的 url 添加到该文件中，每个 url 都必须是单独的一行

```shell
vim download_list.txt
```

然后使用-i 选项，后跟该文本文件

```shell
wget -i download_list.txt
```

该命令会下载 download_list.txt 文件中列出的所有文件

## --limit-rate

要限制下载速度，使用 `--limit-rate` 选项，例如：

```shell
wget --limit-rate=100k https://download.redis.io/releases/redis-7.4.1.tar.gz
```

该命令会限制下载速度为 100k/s

## -U

要指定用户代理，使用 `-U` 选项，例如：

```shell
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36" https://download.redis.io/releases/redis-7.4.1.tar.gz
```

该命令会指定用户代理为 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"

## -t

要指定重试次数，使用 `-t` 选项，例如：

```shell
wget -t 3 https://download.redis.io/releases/redis-7.4.1.tar.gz
```

该命令会指定重试次数为 3 次

## --tries

要指定重试次数，使用 `--tries` 选项，例如：

```shell
wget --tries=3 https://download.redis.io/releases/redis-7.4.1.tar.gz
```

该命令会指定重试次数为 3 次

## 通过 FTP 下载文件

要通过 FTP 下载文件，使用 `-m` 选项，例如：

```shell
wget -m ftp://ftp.example.com/pub/file.txt
```

该命令会下载文件到当前工作目录中，并将其保存为 `file.txt` 文件

如果需要指定用户名密码

```shell
wget --ftp-user=<username> --ftp-password=<password> url
```

...
