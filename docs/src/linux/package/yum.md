---
title: linux - yum
---

# yum

​yum（全称为 Yellow dog Updater, Modified）是一个前端软件包管理器。基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。yum 提供了查找、安装、删除某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。yum 是基于 C/S 的架构，C=client，S=ftp/http/file。

## 工具使用

### 安装

```shell
#安装软件包，-y直接安装
[root@node5 ~]# yum -y install telnet
```

### 升级

```shell
[root@node5 ~]# yum -y update    #升级软件包，改变软件设置和系统设置,系统版本内核都升级,不加任何包，表示整个系统进行升级
[root@node5 ~]# yum -y upgrade   #升级软件包，不改变软件设置和系统设置，系统版本升级，内核不改变

```

## 查看搜索

```shell
#查询rpm包telnet作用
[root@node5 ~]# yum info telnet
Loaded plugins: fastestmirror
Repository base is listed more than once in the configuration
Repository updates is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository epel is listed more than once in the configuration
Repository epel-debuginfo is listed more than once in the configuration
Repository epel-source is listed more than once in the configuration
Loading mirror speeds from cached hostfile
Installed Packages
Name        : telnet
Arch        : x86_64
Epoch       : 1
Version     : 0.17
Release     : 65.el7_8
Size        : 113 k
Repo        : installed
From repo   : updates
Summary     : The client program for the Telnet remote login protocol
URL         : http://web.archive.org/web/20070819111735/www.hcs.harvard.edu/~dholland/computers/old-netkit.html
License     : BSD
Description : Telnet is a popular protocol for logging into remote systems over the
            : Internet. The package provides a command line Telnet client

#查看命令是哪个软件包安装的
[root@node5 ~]# yum provides /usr/bin/find
Loaded plugins: fastestmirror
Repository base is listed more than once in the configuration
Repository updates is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository epel is listed more than once in the configuration
Repository epel-debuginfo is listed more than once in the configuration
Repository epel-source is listed more than once in the configuration
Loading mirror speeds from cached hostfile
1:findutils-4.5.11-6.el7.x86_64 : The GNU versions of find utilities (find and xargs)
Repo        : base
Matched from:
Filename    : /usr/bin/find



1:findutils-4.5.11-5.el7.x86_64 : The GNU versions of find utilities (find and xargs)
Repo        : @anaconda
Matched from:
Filename    : /usr/bin/find

#按关键字搜索软件包
[root@node5 ~]# yum search extundelet
============================================================================================ N/S matched: extundelet ============================================================================================
extundelete.x86_64 : An ext3 and ext4 file system undeletion utility

  Name and summary matches only, use "search all" for everything.

```

## 卸载

```shell
#卸载telnet
[root@node5 ~]# yum -y remove telnet

```

## 安装软件组功能

> yum groupinstall GROUPNAME

```shell
#查看有哪些软件包组
[root@node5 ~]# yum grouplist

#安装软件包组
[root@node5 ~]# yum groupinstall 'Compatibility Libraries' -y

```
