---
title: linux - 网络配置
---

# 网络配置

## 本机与虚拟机通信

**查看本机 ip**

![net_00](../img/network/net_00.png)

![net_01](../img/network/net_01.png)

然后右键点击状态，ipv4 这个网是局域网 ip，并不是上网的 ip

![net_02](../img/network/net_02.png)

**cmd**

输入 ipconfig，下图因为连的是 wifi 所以是这个

![net_03](../img/network/net_03.png)

回到虚拟机 ping 这个地址

> 如果通了则说明能接收到信息

![net_04](../img/network/net_04.png)

查看自己虚拟机的 ip

![net_05](../img/network/net_05.png)

**ifconfig**

虚拟机查看网络的指令

![net_06](../img/network/net_06.png)

**主机 ping 虚拟机**

![net_07](../img/network/net_07.png)

::: details 为什么不在同一个网段却可以 ping 通

以下第一、二个网络就是虚拟机的网络，第二个网段与 vmware 里面的网段一样

![net_09](../img/network/net_09.png)

虚拟机配置的时候，网络是 NAT 模式的

![net_10](../img/network/net_10.png)

**桥接模式**

虚拟机直接连接外部物理网络的模式，主机起到了网桥的作用。这种模式下，虚拟机可以直接访问外部网络，丙炔对外部网络是可见的

![net_11](../img/network/net_11.png)

**nat 模式**

虚拟机和主机构建一个专用网络，并通过虚拟网络地址转换（NAT）设备对 IP 进行转换。虚拟机通过共享主机 IP 可以访问外部网络，但外部网络无法访问虚拟机

![net_12](../img/network/net_12.png)

vm 与 pc 交互是因为 nat 将路由转换成与 pc 一样的地址结构，pc 与 vm 交互通过 win 里面的网卡，将地址转换成 vm 一样的地址结构

**在 vm 里面的体现**

![net_13](../img/network/net_13.png)

这里也间接的说明了，为什么 vm 里面的网关是 .2 而 win 里面的虚拟网关是 .1，因为在虚拟的局域网里面真正的网关应该设置在路由器上面，与 pc 的网关通信

![net_14](../img/network/net_14.png)
:::

## 修改静态 ip

::: tip
现在的 ip 地址都是 DHCP 动态分配的，如果重启服务器以后， IP 地址就会发生改变，因此尽可能的要把 IP 写死，不然每次重启都需要查找修改
:::

**修改 window**

vmnet8 是 pc 虚拟出的网关，为了和 linux 处统一网络环境

一般都是主机要远程操控服务器，所以这里的修改没有必要

![net_08](../img/network/net_08.png)

虚拟机联系 pc 的设置

![net_15](../img/network/net_15.png)

主机操作虚拟机的操作（虚拟机里面指定静态 ip）

1. 进入 etc 网络设置

   ::: danger 当前设置
   vmware 的 linux_review 虚拟模块，此处设置的端口号为 : 192.168.16.123

   笔记是之前的，因此可能有所偏差
   :::

   ![net_16](../img/network/net_16.png)

2. 进入 etc 网络设置

   ![net_17](../img/network/net_17.png)

3. 进入 etc 网络设置

   ![net_18](../img/network/net_18.png)

4. 进入 etc 网络设置

   ![net_19](../img/network/net_19.png)

5. 进入 etc 网络设置

   ![net_20](../img/network/net_20.png)

## 配置主机名

**修改配置文件的方式修改**

查看当前主机的 hostname 进入配置页

![net_21](../img/network/net_21.png)

把主机名改成 chenwei086 然后重启服务

![net_22](../img/network/net_22.png)

**通过终端修改**

```bash
hostnamectl set-hostname linux_review

当前的测试 linux_review 设置的就是 ：linux_review
```

## 修改映射表

**修改 host 映射表**

控制台输入： vim /etc/hosts 进入映射表进行配置

![net_23](../img/network/net_23.png)

**修改 win 里面的 host 文件**

::: danger 当前案例的修改
192.168.16.123 linuxchenwei.com

所以下次过来测试的时候应该：ping linuxchenwei.com
:::

进入 C:\Windows\System32\drivers\etc 修改

![net_24](../img/network/net_24.png)

测试：

![net_25](../img/network/net_25.png)
