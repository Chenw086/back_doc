---
title: linux - 虚拟机克隆
---

::: danger 说明
这里的内容是 window

mac 虚拟机基础款已经在 虚拟机/base
:::

# 虚拟机克隆

## 克隆流程

从现有虚拟机(关机状态)克隆出新虚拟机，右键选择管理 - 克隆

![cl_01](../img/clone/clo_01.png)

点击下一步

![cl_02](../img/clone/clo_02.png)

选择虚拟机中的当前状态

![cl_03](../img/clone/clo_03.png)

选择创建完整克隆

![cl_04](../img/clone/clo_04.png)

设置虚拟机名称及存储位置

![cl_05](../img/clone/clo_05.png)

## 修改配置

修改 vim /etc/sysconfig/network-scripts/ifcfg-ens33，修改 IP 地址（root 用户进入）

![cl_06](../img/clone/clo_06.png)

修改主机名：/etc/hostname

![cl_07](../img/clone/clo_07.png)

```bash
# 重启网络服务
service network restart
```
