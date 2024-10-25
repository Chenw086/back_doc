---
title: linux - rpm
---

# rpm

**关于软件包**

​ 在 linux 中安装软件是需要安装包的，软件的安装包有各种类型：.zip，.rar，.rpm，.tar.gz，.tar。软件包还可以分为源代码包和二进制包，源代码包是没有经过编译的包，需要经过 GCC、C++编译器环境编译才能运行。二进制包无需编译，可以直接安装使用。区分是否为源代码包还是二进制包还得基于软件包里面的文件来判断，包含.h、.c、.cpp、.cc 等结尾的源码文件，称之为源代码包，而软件包里面存在 bin 目录（bin 目录里有可执行文件），称之为二进制包。源码包高度可定制，可以自由选择自己需要的功能

## rpm 软件包

​ RPM 是 RPM Package Manager（RPM 软件包管理器）的缩写，这一文件格式名称虽然打上了 RedHat 的标志，但是其原始设计理念是开放式的，现在包括 OpenLinux、SUSE 以及 Turbo Linux 等 Linux 的分发版本都有采用，可以算是公认的行业标准了。`RPM 包是二进制包可以直接使用`

::: danger aarch-64 资源
[aarch-64 rpm 资源(搜索)](<https://rpmfind.net/linux/rpm2html/search.php?query=httpd(aarch-64)>)

[阿里现成包镜像](https://mirrors.aliyun.com/centos-altarch/7/os/aarch64/Packages/?spm=a2c6h.25603864.0.0.333732beL1dT7G)
:::

## rpm 包通用的命名规则

RPM 包的一般命名规则为：name-version-arch.rpm 或者 name-version-arch.src.rpm

- ​name 就是软件包的名称
- version 是软件的版本号，版本号的格式通常为“主版本号.次版本号.修正号”，也有发布版本号，表示这个 RPM 包是第几次编译生成的
- arch 表示软件包适用的硬件平台，目前 RPM 支持的平台有：i386，i586，i686、sparc，alpha，x86_64 等等
- .rpm 或.src.rpm,是 RPM 包类型的后缀，.rpm 是编译好的二进制包，可用 rpm 命令直接安装；.src.rpm 表示是源代码包，需要编译之后才可以使用
- el\* 表示这个软件包的发行商版本,el7 表示这个软件包是在 RHEL 7.x/CentOS 7.x 下使用
- devel：表示这个 RPM 包是软件的开发包
- ​noarch：说明这样的软件包可以在任何平台上安装，不需要特定的硬件平台。在任何硬件平台上都可以运行
- manual 手册文档

```shell
httpd-2.2.3-29.el5.i386.rpm
软件名称httpd|软件版本号2.2.3|发布版本号29|el5软件包是在RHEL 5.x/CentOS 5.x下使用|包适用的硬件平台i386|RPM包的类型
```

## rpm 工具的使用

rpm 工具可以进行安装、查询、验证、更新、删除等操作

### 安装

RPM 的命令格式：rpm [参数] 软件包，rpm 的安装参数有：

- -i 安装软件包
- -v 显示附加信息，提供更多详细信息
- -V 校验，对已经安装的软件进行校验
- -h --hash 安装时输出 #### 标记

**使用 rpm 时，什么情况使用软件包全名，什么时候使用软件包名？**

> 1. 在安装和更新升级时候使用全名
> 2. 对已经安装过的软件包进行操作时，比如查找已经安装的某个包，卸载包等 ，使用包名
> 3. 当我们使用 rpm 查找某个 rpm 安装包的信息时，默认去目录/var/lib/rpm 下面进行搜索

当一个 rpm 包安装到系统上之后，安装信息通常会保存在本地的 /var/lib/rpm/ 目录下

```shell
[root@node5 ~]# ls /var/lib/rpm

Basenames  Conflictname  __db.001  __db.002  __db.003  Dirnames  Group  Installtid  Name  Obsoletename  Packages  Providename  Requirename  Sha1header  Sigmd5  Triggername
```

- 从本地安装 rpm 安装包

```shell
[root@node5 ~]# rpm -ivh telnet-0.17-64.el7.x86_64.rpm
Preparing...                          ################################# [100%]
Updating / installing...
   1:telnet-1:0.17-64.el7             ################################# [100%]
```

- 从网上下载 centos epel 扩展源，然后安装

```shell
#注释：epel源是对centos7系统中自带的 base源的扩展。
[root@node5 ~]# rpm -ivh http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
Retrieving http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
Preparing...                          ################################# [100%]
Updating / installing...
   1:epel-release-7-12                ################################# [100%]
```

- 安装 rpm 包的时候，有时候需要解决依赖关系，这时候根据提示，优先安装依赖包，再次安装即可

```shell
[root@node5 ~]# rpm -ivh mariadb-server-5.5.56-2.el7.x86_64.rpm
警告：/mnt/Packages/mariadb-server-5.5.56-2.el7.x86_64.rpm: 头V3 RSA/SHA256 Signature, 密钥 ID f4a80eb5: NOKEY
错误：依赖检测失败：
	mariadb(x86-64) = 1:5.5.56-2.el7 被 mariadb-server-1:5.5.56-2.el7.x86_64 需要
	perl-DBD-MySQL 被 mariadb-server-1:5.5.56-2.el7.x86_64 需要
解决：
[root@node5 ~]# rpm -ivh /mnt/Packages/mariadb-5.5.56-2.el7.x86_64.rpm
[root@node5 ~]# rpm -ivh /mnt/Packages/perl-DBD-MySQL-4.023-5.el7.x86_64.rpm
[root@node5 ~]# rpm -ivh /mnt/Packages/mariadb-server-5.5.56-2.el7.x86_64.rpm
```

### 查询

rpm 查询语法：rpm -q（query），常与下面参数组合使用

- -a(all) 查询所有已安装的软件包
- -f(file) 查询系统文件名（查询系统文件所属哪个软件包），反向查询
- -i 显示已经安装的 rpm 软件包信息，后面直接跟着包名
- -l(list) 查询软件包中文件安装的位置
- -p 查询未安装软件包的相关信息，后面要跟软件的全名
- -R 查询软件包的依赖性

```shell
#查询zsh包是否安装
[root@node5 ~]# rpm -q zsh
zsh-5.0.2-34.el7_8.2.x86_64

#查询所有已安装的软件包
[root@node5 ~]# rpm -qa
......
libX11-1.6.7-2.el7.x86_64
kernel-3.10.0-693.el7.x86_64
setup-2.8.71-7.el7.noarch
......

#查询所有已安装包中带rest关键字的包
[root@node5 ~]# rpm -qa | grep rest
rest-0.8.1-2.el7.x86_64

#查看find命令的路径
[root@node5 ~]# which find
/usr/bin/find

#查看find命令的路径
[root@node5 ~]# whereis find
find: /usr/bin/find /usr/share/man/man1/find.1.gz

#查询文件或命令属于哪个安装包
[root@node5 ~]# rpm -qf /usr/bin/find
findutils-4.5.11-5.el7.x86_64

#查询已经安装的rpm包的详细信息或作用
[root@node5 ~]# rpm -qi hardlink
Name        : hardlink
Epoch       : 1
Version     : 1.0
Release     : 19.el7
Architecture: x86_64
Install Date: Fri 26 Apr 2019 05:10:21 PM CST
Group       : System Environment/Base
Size        : 16545
License     : GPL+
Signature   : RSA/SHA256, Fri 04 Jul 2014 09:53:40 AM CST, Key ID 24c6a8a7f4a80eb5
Source RPM  : hardlink-1.0-19.el7.src.rpm
Build Date  : Tue 10 Jun 2014 02:26:04 PM CST
Build Host  : worker1.bsys.centos.org
Relocations : (not relocatable)
Packager    : CentOS BuildSystem <http://bugs.centos.org>
Vendor      : CentOS
URL         : http://pkgs.fedoraproject.org/gitweb/?p=hardlink.git
Summary     : Create a tree of hardlinks
Description :
hardlink is used to create a tree of hard links.
It's used by kernel installation to dramatically reduce the
amount of diskspace used by each kernel package installed.

#查询没有安装的rpm包的详细信息或作用
[root@node5 ~]# rpm -qpi telnet-0.17-64.el7.x86_64.rpm
Name        : telnet
Epoch       : 1
Version     : 0.17
Release     : 64.el7
Architecture: x86_64
Install Date: (not installed)
Group       : Applications/Internet
Size        : 115888
License     : BSD
Signature   : RSA/SHA256, Fri 11 Aug 2017 04:04:43 AM CST, Key ID 24c6a8a7f4a80eb5
Source RPM  : telnet-0.17-64.el7.src.rpm
Build Date  : Fri 04 Aug 2017 04:00:38 AM CST
Build Host  : c1bm.rdu2.centos.org
Relocations : (not relocatable)
Packager    : CentOS BuildSystem <http://bugs.centos.org>
Vendor      : CentOS
URL         : http://web.archive.org/web/20070819111735/www.hcs.harvard.edu/~dholland/computers/old-netkit.html
Summary     : The client program for the Telnet remote login protocol
Description :
Telnet is a popular protocol for logging into remote systems over the
Internet. The package provides a command line Telnet client

#查看rpm安装后，将生成哪些文件
[root@node5 ~]# rpm -qpl telnet-0.17-64.el7.x86_64.rpm
/usr/bin/telnet
/usr/share/doc/telnet-0.17
/usr/share/doc/telnet-0.17/README
/usr/share/man/man1/telnet.1.gz

#查看已安装的命令，生成了哪些文件
[root@node5 ~]# rpm -ql telnet
/usr/bin/telnet
/usr/share/doc/telnet-0.17
/usr/share/doc/telnet-0.17/README
/usr/share/man/man1/telnet.1.gz

```

### 查看软件包是否被修改

```shell
[root@node5 ~]# which telnet
/usr/bin/telnet

[root@node5 ~]# rpm -qf /usr/bin/telnet
telnet-0.17-64.el7.x86_64

#查看telnet命令内容是否被修改，没有输出，则没有被修改
[root@node5 ~]# rpm -Vf /usr/bin/telnet

[root@node5 ~]# echo aaa >> /usr/bin/telnet

[root@node5 ~]# rpm -Vf /usr/bin/telnet
S.5....T.    /usr/bin/telnet

[root@node5 ~]# rpm -V telnet
S.5....T.    /usr/bin/telnet

#注释：如果执行rpm -V 包名  出现的全是点，表示测试通过，命令内容没有被修改
#出现下面的字符代表测试的失败，即是命令内容被修改
5 — MD5 校验和是否改变，你也看成文件内容是否改变
S — 文件长度，大小是否改变
L — 符号链接，文件路径是否改变
T — 文件修改日期是否改变
D — 设备
U — 用户，文件的属主
G — 用户组
M — 模式 (包含许可和文件类型)
? — 不可读文件
#文件类型
c 配置文件
d 普通文件
g 不该出现的文件，意思就是这个文件不该被这个包所包含
l 授权文件（license file）
r 描述文件
```

查看系统中所有的 rpm 包及安装的文件有没有被黑客修改过

```shell
#注释:检查时参考了/var/lib/rpm 目录下的rpm数据库信息
[root@node5 ~]# rpm -Va > rpm_check.txt

[root@node5 ~]# ll rpm_check.txt -h
-rw-r--r-- 1 root root 629 Oct 19 21:34 rpm_check.txt

[root@node5 ~]# cat rpm_check.txt
.......T.  c /etc/httpd/conf/httpd.conf
S.5....T.  c /etc/sysconfig/authconfig
....L....  c /etc/pam.d/fingerprint-auth
....L....  c /etc/pam.d/password-auth
....L....  c /etc/pam.d/postlogin
....L....  c /etc/pam.d/smartcard-auth
....L....  c /etc/pam.d/system-auth
S.5....T.  c /etc/security/limits.conf
missing     /var/run/wpa_supplicant
S.5....T.  c /etc/vsftpd/vsftpd.conf
.....UG..    /var/ftp/pub
S.5....T.  c /etc/sysconfig/iptables
.......T.    /usr/aarch64-linux-gnu/include/rpc/netdb.h
S.5....T.    /usr/bin/telnet
S.5....T.  c /etc/rc.d/rc.local
.M.......    /etc/rc.d/init.d/functions
S.5....T.  c /etc/sysctl.conf

```

### 卸载

卸载软件的语法：rpm -e（erase） 包名

```shell
[root@node5 ~]# rpm -q telnet
telnet-0.17-64.el7.x86_64

[root@node5 ~]# rpm -e telnet
[root@node5 ~]# rpm -q telnet
package telnet is not installed

#有时候卸载的软件包有依赖关系，所以加上--nodeps强制卸载软件
[root@node5 ~]# rpm -e --nodeps lrzsz
```

### 升级

rpm -Uvh 包名

```shell
[root@node5 ~]# rpm -Uvh telnet-0.17-64.el7.x86_64.rpm
Preparing...                          ################################# [100%]
Updating / installing...
   1:telnet-1:0.17-64.el7             ################################# [100%]
```
