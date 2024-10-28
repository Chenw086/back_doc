---
title: linux - source
---

# source

::: danger 切换 yum 源
[arm 源切换](https://wu55555.blog.csdn.net/article/details/128175716)
:::

- 新增 epel 源

```shell
# 当前位置
[root@localhost yum.repos.d]# pwd
/etc/yum.repos.d

# 查看文件
[root@localhost yum.repos.d]# ls
CentOS-aarch64-kernel.repo  CentOS-Base.repo  CentOS-Base.repo.123  CentOS-Base.repo.2  CentOS-Base.repo.old  CentOS-CR.repo  CentOS-Debuginfo.repo  CentOS-fasttrack.repo  CentOS-Media.repo  CentOS-Sources.repo  CentOS-Vault.repo

# 安装 epel
[root@localhost yum.repos.d]# yum install -y epel-release
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile
正在解决依赖关系
--> 正在检查事务
---> 软件包 epel-release.noarch.0.7-11 将被 安装
--> 解决依赖关系完成

依赖关系解决

=============================================================================================================================================================================================================================================================================================================
 Package                                                                       架构                                                                    版本                                                                    源                                                                       大小
=============================================================================================================================================================================================================================================================================================================
正在安装:
 epel-release                                                                  noarch                                                                  7-11                                                                    extras                                                                   15 k

事务概要
=============================================================================================================================================================================================================================================================================================================
安装  1 软件包

总下载量：15 k
安装大小：24 k
Downloading packages:
epel-release-7-11.noarch.rpm                                                                                                                                                                                                                                                          |  15 kB  00:00:06
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  正在安装    : epel-release-7-11.noarch                                                                                                                                                                                                                                                                 1/1
  验证中      : epel-release-7-11.noarch                                                                                                                                                                                                                                                                 1/1

已安装:
  epel-release.noarch 0:7-11

完毕！

# 下载 epel 配置
[root@localhost yum.repos.d]# wget -O /etc/yum.repos.d/epel-7.repo http://mirrors.aliyun.com/repo/epel-7.repo
--2024-10-25 04:01:39--  http://mirrors.aliyun.com/repo/epel-7.repo
正在解析主机 mirrors.aliyun.com (mirrors.aliyun.com)... 163.181.140.236, 163.181.140.233, 163.181.140.238, ...
正在连接 mirrors.aliyun.com (mirrors.aliyun.com)|163.181.140.236|:80... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：664 [application/octet-stream]
正在保存至: “/etc/yum.repos.d/epel-7.repo”

100%[===================================================================================================================================================================================================================================================================>] 664         --.-K/s 用时 0s

2024-10-25 04:01:45 (49.3 MB/s) - 已保存 “/etc/yum.repos.d/epel-7.repo” [664/664])

# 查看是否下载
[root@localhost yum.repos.d]# ls
CentOS-aarch64-kernel.repo  CentOS-Base.repo  CentOS-Base.repo.123  CentOS-Base.repo.2  CentOS-Base.repo.old  CentOS-CR.repo  CentOS-Debuginfo.repo  CentOS-fasttrack.repo  CentOS-Media.repo  CentOS-Sources.repo  CentOS-Vault.repo  epel-7.repo  epel.repo  epel-testing.repo

# 清除缓存
[root@localhost yum.repos.d]# yum clean all
已加载插件：fastestmirror
Repository epel is listed more than once in the configuration
Repository epel-debuginfo is listed more than once in the configuration
Repository epel-source is listed more than once in the configuration
正在清理软件源： base epel extras updates
Cleaning up list of fastest mirrors

# 重新加载缓存
[root@localhost yum.repos.d]# yum makecache
已加载插件：fastestmirror
Repository epel is listed more than once in the configuration
Repository epel-debuginfo is listed more than once in the configuration
Repository epel-source is listed more than once in the configuration
Determining fastest mirrors
base                                                                                                                                                                                                                                                                                  | 3.6 kB  00:00:00
epel                                                                                                                                                                                                                                                                                  | 5.4 kB  00:00:00
extras                                                                                                                                                                                                                                                                                | 2.9 kB  00:00:00
updates                                                                                                                                                                                                                                                                               | 2.9 kB  00:00:00
(1/17): base/7/aarch64/group_gz                                                                                                                                                                                                                                                       | 153 kB  00:00:06
(2/17): base/7/aarch64/filelists_db                                                                                                                                                                                                                                                   | 6.2 MB  00:00:07
(3/17): base/7/aarch64/primary_db                                                                                                                                                                                                                                                     | 4.9 MB  00:00:01
(4/17): base/7/aarch64/other_db                                                                                                                                                                                                                                                       | 2.1 MB  00:00:00
(5/17): epel/aarch64/group_gz                                                                                                                                                                                                                                                         |  88 kB  00:00:06
(6/17): epel/aarch64/updateinfo                                                                                                                                                                                                                                                       | 1.0 MB  00:00:00
(7/17): epel/aarch64/filelists_db                                                                                                                                                                                                                                                     |  11 MB  00:00:07
(8/17): epel/aarch64/prestodelta                                                                                                                                                                                                                                                      | 3.5 kB  00:00:00
(9/17): epel/aarch64/other_db                                                                                                                                                                                                                                                         | 3.2 MB  00:00:01
(10/17): epel/aarch64/primary_db                                                                                                                                                                                                                                                      | 6.6 MB  00:00:02
(11/17): epel/aarch64/updateinfo_zck                                                                                                                                                                                                                                                  | 1.5 MB  00:00:01
(12/17): extras/7/aarch64/filelists_db                                                                                                                                                                                                                                                | 358 kB  00:00:06
(13/17): extras/7/aarch64/primary_db                                                                                                                                                                                                                                                  | 255 kB  00:00:06
(14/17): extras/7/aarch64/other_db                                                                                                                                                                                                                                                    | 154 kB  00:00:00
(15/17): updates/7/aarch64/primary_db                                                                                                                                                                                                                                                 | 4.0 MB  00:00:07
(16/17): updates/7/aarch64/filelists_db                                                                                                                                                                                                                                               | 4.3 MB  00:00:07
(17/17): updates/7/aarch64/other_db                                                                                                                                                                                                                                                   | 1.1 MB  00:00:00
元数据缓存已建立
```

- 查看系统可用的 yum 源和所有的 yum 源

```shell
# 查看系统可用的 yum 源
[root@localhost yum.repos.d]# yum repolist enabled
已加载插件：fastestmirror
Repository epel is listed more than once in the configuration
Repository epel-debuginfo is listed more than once in the configuration
Repository epel-source is listed more than once in the configuration
Loading mirror speeds from cached hostfile
源标识                                                                                                                              源名称                                                                                                                                                             状态
base/7/aarch64                                                                                                                      CentOS-7 - Base                                                                                                                                                     7,629
epel/aarch64                                                                                                                        Extra Packages for Enterprise Linux 7 - aarch64                                                                                                                    12,988
extras/7/aarch64                                                                                                                    CentOS-7 - Extras                                                                                                                                                     523
updates/7/aarch64                                                                                                                   CentOS-7 - Updates                                                                                                                                                  4,354
repolist: 25,494

# 查看所有的 yum 源
[root@localhost yum.repos.d]# yum repolist all
已加载插件：fastestmirror
Repository epel is listed more than once in the configuration
Repository epel-debuginfo is listed more than once in the configuration
Repository epel-source is listed more than once in the configuration
Loading mirror speeds from cached hostfile
源标识                                                                                                                           源名称                                                                                                                                                          状态
C7.1.1503-base/aarch64                                                                                                           CentOS-7.1.1503 - Base                                                                                                                                          禁用
C7.1.1503-centosplus/aarch64                                                                                                     CentOS-7.1.1503 - CentOSPlus                                                                                                                                    禁用
C7.1.1503-extras/aarch64                                                                                                         CentOS-7.1.1503 - Extras                                                                                                                                        禁用
C7.1.1503-fasttrack/aarch64                                                                                                      CentOS-7.1.1503 - Fasttrack                                                                                                                                     禁用
C7.1.1503-updates/aarch64                                                                                                        CentOS-7.1.1503 - Updates                                                                                                                                       禁用
C7.2.1511-base/aarch64                                                                                                           CentOS-7.2.1511 - Base                                                                                                                                          禁用
C7.2.1511-centosplus/aarch64                                                                                                     CentOS-7.2.1511 - CentOSPlus                                                                                                                                    禁用
C7.2.1511-extras/aarch64                                                                                                         CentOS-7.2.1511 - Extras                                                                                                                                        禁用
C7.2.1511-fasttrack/aarch64                                                                                                      CentOS-7.2.1511 - Fasttrack                                                                                                                                     禁用
C7.2.1511-updates/aarch64                                                                                                        CentOS-7.2.1511 - Updates                                                                                                                                       禁用
C7.2.1603-base/aarch64                                                                                                           CentOS-7.2.1603 - Base                                                                                                                                          禁用
C7.2.1603-centosplus/aarch64                                                                                                     CentOS-7.2.1603 - CentOSPlus                                                                                                                                    禁用
C7.2.1603-extras/aarch64                                                                                                         CentOS-7.2.1603 - Extras                                                                                                                                        禁用
C7.2.1603-fasttrack/aarch64                                                                                                      CentOS-7.2.1603 - Fasttrack                                                                                                                                     禁用
C7.2.1603-updates/aarch64                                                                                                        CentOS-7.2.1603 - Updates                                                                                                                                       禁用
C7.3.1611-base/aarch64                                                                                                           CentOS-7.3.1611 - Base                                                                                                                                          禁用
C7.3.1611-centosplus/aarch64                                                                                                     CentOS-7.3.1611 - CentOSPlus                                                                                                                                    禁用
C7.3.1611-extras/aarch64                                                                                                         CentOS-7.3.1611 - Extras                                                                                                                                        禁用
C7.3.1611-fasttrack/aarch64                                                                                                      CentOS-7.3.1611 - Fasttrack                                                                                                                                     禁用
C7.3.1611-updates/aarch64                                                                                                        CentOS-7.3.1611 - Updates                                                                                                                                       禁用
C7.4.1708-base/aarch64                                                                                                           CentOS-7.4.1708 - Base                                                                                                                                          禁用
C7.4.1708-centosplus/aarch64                                                                                                     CentOS-7.4.1708 - CentOSPlus                                                                                                                                    禁用
C7.4.1708-extras/aarch64                                                                                                         CentOS-7.4.1708 - Extras                                                                                                                                        禁用
C7.4.1708-fasttrack/aarch64                                                                                                      CentOS-7.4.1708 - Fasttrack                                                                                                                                     禁用
C7.4.1708-updates/aarch64                                                                                                        CentOS-7.4.1708 - Updates                                                                                                                                       禁用
C7.5.1804-base/aarch64                                                                                                           CentOS-7.5.1804 - Base                                                                                                                                          禁用
C7.5.1804-centosplus/aarch64                                                                                                     CentOS-7.5.1804 - CentOSPlus                                                                                                                                    禁用
C7.5.1804-extras/aarch64                                                                                                         CentOS-7.5.1804 - Extras                                                                                                                                        禁用
C7.5.1804-fasttrack/aarch64                                                                                                      CentOS-7.5.1804 - Fasttrack                                                                                                                                     禁用
C7.5.1804-updates/aarch64                                                                                                        CentOS-7.5.1804 - Updates                                                                                                                                       禁用
C7.6.1810-base/aarch64                                                                                                           CentOS-7.6.1810 - Base                                                                                                                                          禁用
C7.6.1810-centosplus/aarch64                                                                                                     CentOS-7.6.1810 - CentOSPlus                                                                                                                                    禁用
C7.6.1810-extras/aarch64                                                                                                         CentOS-7.6.1810 - Extras                                                                                                                                        禁用
C7.6.1810-fasttrack/aarch64                                                                                                      CentOS-7.6.1810 - Fasttrack                                                                                                                                     禁用
C7.6.1810-updates/aarch64                                                                                                        CentOS-7.6.1810 - Updates                                                                                                                                       禁用
C7.7.1908-base/aarch64                                                                                                           CentOS-7.7.1908 - Base                                                                                                                                          禁用
C7.7.1908-centosplus/aarch64                                                                                                     CentOS-7.7.1908 - CentOSPlus                                                                                                                                    禁用
C7.7.1908-extras/aarch64                                                                                                         CentOS-7.7.1908 - Extras                                                                                                                                        禁用
C7.7.1908-fasttrack/aarch64                                                                                                      CentOS-7.7.1908 - Fasttrack                                                                                                                                     禁用
C7.7.1908-updates/aarch64                                                                                                        CentOS-7.7.1908 - Updates                                                                                                                                       禁用
C7.8.2003-base/aarch64                                                                                                           CentOS-7.8.2003 - Base                                                                                                                                          禁用
C7.8.2003-centosplus/aarch64                                                                                                     CentOS-7.8.2003 - CentOSPlus                                                                                                                                    禁用
C7.8.2003-extras/aarch64                                                                                                         CentOS-7.8.2003 - Extras                                                                                                                                        禁用
C7.8.2003-fasttrack/aarch64                                                                                                      CentOS-7.8.2003 - Fasttrack                                                                                                                                     禁用
C7.8.2003-updates/aarch64                                                                                                        CentOS-7.8.2003 - Updates                                                                                                                                       禁用
base/7/aarch64                                                                                                                   CentOS-7 - Base                                                                                                                                                 启用:  7,629
base-debuginfo/aarch64                                                                                                           CentOS-7 - Debuginfo                                                                                                                                            禁用
base-source/7                                                                                                                    CentOS-7 - Base Sources                                                                                                                                         禁用
c7-media                                                                                                                         CentOS-7 - Media                                                                                                                                                禁用
centos-kernel/7/aarch64                                                                                                          CentOS LTS Kernels for aarch64                                                                                                                                  禁用
centos-kernel-experimental/7/aarch64                                                                                             CentOS Experimental Kernels for aarch64                                                                                                                         禁用
centosplus/7/aarch64                                                                                                             CentOS-7 - Plus                                                                                                                                                 禁用
centosplus-source/7                                                                                                              CentOS-7 - Plus Sources                                                                                                                                         禁用
cr/7/aarch64                                                                                                                     CentOS-7 - cr                                                                                                                                                   禁用
epel/aarch64                                                                                                                     Extra Packages for Enterprise Linux 7 - aarch64                                                                                                                 启用: 12,988
epel-debuginfo/aarch64                                                                                                           Extra Packages for Enterprise Linux 7 - aarch64 - Debug                                                                                                         禁用
epel-source                                                                                                                      Extra Packages for Enterprise Linux 7 - aarch64 - Source                                                                                                        禁用
epel-testing/aarch64                                                                                                             Extra Packages for Enterprise Linux 7 - Testing - aarch64                                                                                                       禁用
epel-testing-debuginfo/aarch64                                                                                                   Extra Packages for Enterprise Linux 7 - Testing - aarch64 - Debug                                                                                               禁用
epel-testing-source/aarch64                                                                                                      Extra Packages for Enterprise Linux 7 - Testing - aarch64 - Source                                                                                              禁用
extras/7/aarch64                                                                                                                 CentOS-7 - Extras                                                                                                                                               启用:    523
extras-source/7                                                                                                                  CentOS-7 - Extras Sources                                                                                                                                       禁用
fasttrack/7/aarch64                                                                                                              CentOS-7 - fasttrack                                                                                                                                            禁用
updates/7/aarch64                                                                                                                CentOS-7 - Updates                                                                                                                                              启用:  4,354
updates-source/7                                                                                                                 CentOS-7 - Updates Sources                                                                                                                                      禁用
repolist: 25,494
[root@localhost yum.repos.d]# 
```
