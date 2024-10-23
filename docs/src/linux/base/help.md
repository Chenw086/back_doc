---
title: linux - 帮助命令
---

# 帮助命令

Shell 可以看作是一个命令解释器，为我们提供了交互式的文本控制台界面。我们可以通过终端控制台来输入命令，由 shell 进行解释并最终交给内核执行

## man

```shell
# 获取帮助信息
man [命令或配置文件]
```

| 语法        | 功能                     |
| :---------- | ------------------------ |
| NAME        | 命令的名称和当行描述     |
| SYNOPSIS    | 怎样使用命令             |
| DESCRIPTION | 命令功能的深入探讨       |
| EXAMPLES    | 怎样使用命令的例子       |
| SEE ALSO    | 相关主题（通常是手册页） |

::: code-group

```shell [查看]
man ls
```

```shell [查看内置命令手册]
# 控制台输入
man -f 指令
```

```shell [获取提示进入查看]
[root@localhost ~]# man -f cd
cd (1)               - bash built-in commands, see bash(1)

[root@localhost ~]# man 1 cd
# 这样输入以后就会进入说明了
```

:::

## help

一部分基础功能的系统命令是直接内嵌在 shell 中，系统加载启动之后会随着 shell 一起加载，常驻在内存中。这部分命令被称为“内置命令”，相应的其他命令被称为“外部命令”

```shell
# 基础语法
help 命令

# 示例
[root@localhost ~]# help cd
cd: cd [-L|[-P [-e]]] [dir]
    Change the shell working directory.

    Change the current directory to DIR.  The default DIR is the value of the
    HOME shell variable.

    The variable CDPATH defines the search path for the directory containing
    DIR.  Alternative directory names in CDPATH are separated by a colon (:).
    A null directory name is the same as the current directory.  If DIR begins
    with a slash (/), then CDPATH is not used.

    If the directory is not found, and the shell option `cdable_vars' is set,
    the word is assumed to be  a variable name.  If that variable has a value,
    its value is used for DIR.

    Options:
        -L      force symbolic links to be followed
        -P      use the physical directory structure without following symbolic
        links
        -e      if the -P option is supplied, and the current working directory
        cannot be determined successfully, exit with a non-zero status

    The default is to follow symbolic links, as if `-L' were specified.

    Exit Status:
    Returns 0 if the directory is changed, and if $PWD is set successfully when
    -P is used; non-zero otherwise.
```

::: warning type 判断是否是内置指令

```shell
[root@localhost ~]# type cd
cd 是 shell 内嵌
```

:::

## 常用快捷键

| 语法     | 作用                               |
| :------- | ---------------------------------- |
| ctrl + c | 停止进程                           |
| ctrl + l | 清屏，等同于 clear，彻底清屏 reset |
| tab      | 提示                               |
| 上下键   | 查找执行过的命令                   |
