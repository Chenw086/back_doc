---
title: linux - 常用指令
---

# 常用指令

## pwd

```shell
# 打印当前工作目录
pwd

# 查看真正的物理路径（比如在软链接上用）
pwd -P
```

## ls

列出目录内容

```shell
ls [选项] [目录或是文件]
```

| 选项 | 说明                                                |
| :--- | --------------------------------------------------- |
| -a   | 全部列出来                                          |
| -l   | 长数据列出，包含文件的属性与权限等等数据，等价于 ll |

每行列出的信息依次是：文件类型、权限、链接数、文件属主、文件属组、文件大小(用 byte 来表示)、建立或最近修改的时间、名字

```shell
[root@localhost ~]# ll
总用量 12
-rw-------. 1 root root 1086 10月 22 23:13 anaconda-ks.cfg
-rw-r--r--. 1 root root 1428 4月  11 2023 Centos-altarch-7.repo
-rw-r--r--. 1 root root  146 10月 23 08:34 wget-1.14-18.el7_6.1.x86_64.rpm
```

## cd

切换路径

```shell
cd [路径]
```

| 语法  | 作用                                   |
| :---- | -------------------------------------- |
| cd~   | 回到自己的目录                         |
| cd -  | 回到上一次所在的目录                   |
| cd -P | 跳转到实际物理路径，而非快捷方式的路径 |

## mkdir

创建目录

```shell
mkdir [选项] 要创建的目录

[root@localhost ~]# mkdir -p a/b/c
[root@localhost ~]# ll
总用量 12
drwxr-xr-x. 3 root root   15 10月 24 01:49 a
-rw-------. 1 root root 1086 10月 22 23:13 anaconda-ks.cfg
-rw-r--r--. 1 root root 1428 4月  11 2023 Centos-altarch-7.repo
-rw-r--r--. 1 root root  146 10月 23 08:34 wget-1.14-18.el7_6.1.x86_64.rpm
```

| 语法 | 功能         |
| :--- | ------------ |
| -p   | 创建多层目录 |

## rmdir

参数与 mkdir 一样，嵌套删除的时候要写最底层路径，如果为空就会递归删除

```shell
[root@localhost ~]# rmdir -p a/b/c
[root@localhost ~]# ll
总用量 12
-rw-------. 1 root root 1086 10月 22 23:13 anaconda-ks.cfg
-rw-r--r--. 1 root root 1428 4月  11 2023 Centos-altarch-7.repo
-rw-r--r--. 1 root root  146 10月 23 08:34 wget-1.14-18.el7_6.1.x86_64.rpm
```

## touch

创建空文件

```shell
touch 文件名称

[root@localhost ~]# touch chenwei
[root@localhost ~]# ls
anaconda-ks.cfg  Centos-altarch-7.repo  chenwei  wget-1.14-18.el7_6.1.x86_64.rpm
```

## cp

```shell
# 复制 source 到 dest
cp [选项] source dest
```

| 选项 | 功能               |
| :--- | ------------------ |
| -r   | 递归复制整个文件夹 |

## rm

```shell
rm [选项] deleteFile
```

| 选项 | 功能                                   |
| :--- | -------------------------------------- |
| -r   | 递归删除目录中所有内容                 |
| -f   | 强制执行删除操作，而不提示用于进行操作 |
| -v   | 显示指令的详细执行过程                 |

```shell
[root@localhost ~]# mkdir -p a/b/c
[root@localhost ~]# rm -rf a
[root@localhost ~]# ll
总用量 12
-rw-------. 1 root root 1086 10月 22 23:13 anaconda-ks.cfg
-rw-r--r--. 1 root root 1428 4月  11 2023 Centos-altarch-7.repo
-rw-r--r--. 1 root root    0 10月 24 01:57 chenwei
-rw-r--r--. 1 root root  146 10月 23 08:34 wget-1.14-18.el7_6.1.x86_64.rpm
```

## mv

移动文件/目录或者重命名

```shell
mv oldNameFile newNameFile

# 示例
[root@localhost ~]# mv Centos-altarch-7.repo test
[root@localhost ~]# ls
anaconda-ks.cfg  chenwei  test  wget-1.14-18.el7_6.1.x86_64.rpm
[root@localhost ~]# mv test Centos-altarch-7.repo
[root@localhost ~]# ls
anaconda-ks.cfg  Centos-altarch-7.repo  chenwei  wget-1.14-18.el7_6.1.x86_64.rpm
```

## cat

查看文件内容，从第一行开始显示

```shell
cat [选项] 文件名
```

| 选项 | 功能                   |
| :--- | ---------------------- |
| -n   | 显示所有行号，包括空行 |

## more

more 指令是一个基于 VI 编辑器的文本过滤器，以全屏幕的方式按页显示文本文件的内容。more 指令中内置了若干快捷键

```shell
more 文件名
```

| 操作     | 说明                              |
| :------- | --------------------------------- |
| space    | 向下翻一页                        |
| enter    | 向下翻一行                        |
| q        | 立刻离开 more，不再显示该文件内容 |
| ctrl + F | 向下滚动一屏                      |
| ctr + b  | 返回上一层                        |
| =        | 输出当前行号                      |
| :f       | 输出文件名和当前行号              |

## less

less 指令用来分屏查看文件内容，它的功能与 more 指令类似，但是比 more 指令更加强大，支持各种显示终端。less 指令在显示文件内容时，并不是一次将整个文件加载之后才显示，而是根据显示需要加载内容，对于显示大型文件具有较高的效率

```shell
less 文件名
```

| 操作     | 说明                                               |
| :------- | -------------------------------------------------- |
| 空白键   | 向下翻动一页                                       |
| pagedown | 向下翻动一页                                       |
| pageup   | 向上翻动一页                                       |
| /字串    | 向下搜寻『字串』的功能；n：向下查找；N：向上查找； |
| ?字串    | 向上搜寻『字串』的功能；n：向上查找；N：向下查找； |

## echo

输出内容到控制台

```shell
echo [选项] [输出内容]
```

| 选项 | 作用                       |
| :--- | -------------------------- |
| -e   | 支持反斜线控制的字符串转换 |

```shell
# 以上选项示例
[root@localhost ~]# echo -e 'hello\nchenwei'
hello
chenwei
[root@localhost ~]# echo 'hello\nchenwei'
hello\nchenwei

# 拿到所有环境变量
[root@localhost ~]# echo $$
1664
```

## head

显示文件头部内容，默认情况下 head 指令显示文件的前十行内容

```shell
# 查看文件的前十行内容
head [选项] 文件

# 查看文件的前 n 行内容
head -n n 文件
```

| 选项      | 作用                   |
| :-------- | ---------------------- |
| -n <行数> | 指定显示头部内容的行数 |

```shell
[root@localhost ~]# head -n 3 Centos-altarch-7.repo
# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
```

## tail

::: info 资料
[官方](https://wangchujiang.com/linux-command/c/tail.html)

[csdn](https://blog.csdn.net/CPOHUI/article/details/107740294)
:::

输出文件尾部内容,默认输出后 10 行内容

其余内容和 head 一样，但是新增了一个 -f 选项，实时追踪文档的所有更新。

监控文件的时候进程会常驻，当第二个终端内容更新内容的时候，会输出到打印台。

这里在第二个终端新增了 hello 在第一个终端会打印出来

## > >>

```shell
# 列表的内容写入文件中（覆盖写）
ls -l > 文件

# 列表的内容追加到文件的末尾
ls -al >> 文件

# 将文件 1 的内容覆盖到文件 2
cat 文件 1 > 文件 2

echo “内容” >> 文件
```

## ln

软链接也称为符号链接，类似于 windows 里的快捷方式，有自己的数据块，主要存放了链接其他文件的路径

```shell
ln -s [源文件或目录] [软连接名]  # 给原文件创建一个软连接
```

在软连接里面修改内容，也会影响到真实的内容

删除软链接： rm -rf 软链接名，而不是 rm -rf 软链接名/，如果使用 rm -rf 软链接名/ 删除，会把软链接对应的真实目录下内容删掉

查询：通过 ll 就可以查看，列表属性第 1 位是 l，尾部会有位置指向

## history

查看已经执行过的历史命令

```shell
history  # 查看已经执行过历史命令

history -c  # 清空历史命令
```

## sed

::: info 资料
[官方](https://wangchujiang.com/linux-command/c/sed.html)
:::

## tree

::: info 资料
[官方](https://wangchujiang.com/linux-command/c/tree.html)
:::
