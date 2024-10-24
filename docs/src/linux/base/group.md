---
title: linux - 用户组管理
---

::: danger 提示
查看所有选项如：man groupadd
:::

# 用户组管理

每个用户都有一个用户组，系统可以对一个用户组中的所有用户进行集中管理。

不同 linux 系统对用户组的规定有所不同，如 linux 下的用户属于与他同名的用户组，这个用户组在创建用户时同时创建

用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改实际上就是对 /etc/group 文件的更新

**查看创建了哪些组**

> cat /etc/group

::: details 展开

```shell
[root@localhost ~]# cat /etc/group
root:x:0:
bin:x:1:
daemon:x:2:
sys:x:3:
adm:x:4:
tty:x:5:
disk:x:6:
lp:x:7:
mem:x:8:
kmem:x:9:
wheel:x:10:
cdrom:x:11:
mail:x:12:postfix
man:x:15:
dialout:x:18:
floppy:x:19:
games:x:20:
tape:x:33:
video:x:39:
ftp:x:50:
lock:x:54:
audio:x:63:
nobody:x:99:
users:x:100:
utmp:x:22:
utempter:x:35:
input:x:999:
systemd-journal:x:190:
systemd-network:x:192:
dbus:x:81:
polkitd:x:998:
ssh_keys:x:997:
sshd:x:74:
postdrop:x:90:
postfix:x:89:
test:x:1000:
```

:::

## groupadd

新增组

```shell
groupadd 组名
```

示例

```shell
[root@localhost ~]# useradd test1

[root@localhost ~]# groupadd grouptest

[root@localhost ~]# usermod grouptest test
用法：usermod [选项] 登录

选项：
  -c, --comment 注释            GECOS 字段的新值
  -d, --home HOME_DIR           用户的新主目录
  -e, --expiredate EXPIRE_DATE  设定帐户过期的日期为 EXPIRE_DATE
  -f, --inactive INACTIVE       过期 INACTIVE 天数后，设定密码为失效状态
  -g, --gid GROUP               强制使用 GROUP 为新主组
  -G, --groups GROUPS           新的附加组列表 GROUPS
  -a, --append GROUP            将用户追加至上边 -G 中提到的附加组中，
                                并不从其它组中删除此用户
  -h, --help                    显示此帮助信息并推出
  -l, --login LOGIN             新的登录名称
  -L, --lock                    锁定用户帐号
  -m, --move-home               将家目录内容移至新位置 (仅于 -d 一起使用)
  -o, --non-unique              允许使用重复的(非唯一的) UID
  -p, --password PASSWORD       将加密过的密码 (PASSWORD) 设为新密码
  -R, --root CHROOT_DIR         chroot 到的目录
  -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
  -s, --shell SHELL             该用户帐号的新登录 shell
  -u, --uid UID                 用户帐号的新 UID
  -U, --unlock                  解锁用户帐号
  -v, --add-subuids FIRST-LAST  add range of subordinate uids
  -V, --del-subuids FIRST-LAST  remove range of subordinate uids
  -w, --add-subgids FIRST-LAST  add range of subordinate gids
  -W, --del-subgids FIRST-LAST  remove range of subordinate gids
  -Z, --selinux-user  SEUSER       用户账户的新 SELinux 用户映射

[root@localhost ~]# usermod -g grouptest test
[root@localhost ~]# usermod -g grouptest test1
[root@localhost ~]# id test
uid=1000(test) gid=1002(grouptest) 组=1002(grouptest)
[root@localhost ~]# id test1
uid=1001(test1) gid=1002(grouptest) 组=1002(grouptest)
```

## groupdel

删除组

```shell
groupdel 组名
```

## groupmod

```shell
# 指定工作组的新组名
groupmod -n 新组名 老组名
```
