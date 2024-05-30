---
title: linux - 安装
---

# 安装

此篇幅主要将如何安装 vmware 与 centos

## 安装新虚拟机

[官网地址：](https://www.vmware.com/cn.html)

::: details 陈伟资源所处位置

> 资源所在地址：D:\学习\2. linux 笔记\linux 学习资料\资料

里面包含 vmware、centos7、Xshell7 安装包

:::

**安装 vmware**

1. 安装的时候所有选项都取消勾选，除了协议
2. 安装完毕桌面点击打开，选择 30 天试用
3. 进入到安装页面

   ![安装主界面](../img/index/base_index_01.png)

4. 创建新的虚拟机

   - 选择自定义
     ![02](../img/index/base_index_02.png)
   - 直接下一步
     ![03](../img/index/base_index_03.png)
   - 稍后安装操作系统
     ![04](../img/index/base_index_04.png)
   - 版本选择
     ![05](../img/index/base_index_05.png)
   - 硬盘选择（随意）
     ![06](../img/index/base_index_06.png)
   - 处理器的选择

     > 任务管理器里面查看，一个 cpu 四个内核拓展出 8 个逻辑内核

     ![07](../img/index/base_index_07.png)

   - 配置选择
     ![08](../img/index/base_index_08.png)
   - 虚拟机内存选择
     ![09](../img/index/base_index_09.png)
   - 网络选择
     ![10](../img/index/base_index_10.png)
   - IO 控制器
     ![11](../img/index/base_index_11.png)
   - 磁盘类型
     ![12](../img/index/base_index_12.png)
   - 选择哪个磁盘
     ![13](../img/index/base_index_13.png)
   - 指定磁盘容量
     ![14](../img/index/base_index_14.png)
   - 磁盘文件名称，直接选中默认
     ![15](../img/index/base_index_15.png)
   - 完成
     ![16](../img/index/base_index_16.png)

## 安装 centos

**确认电脑是否支持 vt-x**

> 查看是否已启用
> 位置在：任务管理器 - 性能

![c01](../img/index/base_index_c01.png)

**安装**

1. 选择 iso

   ![ins_01](../img/index/base_index_install_01.png)

2. 开启虚拟机

   ![ins_02](../img/index/base_index_install_02.png)

3. 进入黑屏，选择第一个回车

4. 选择简体中文

5. ![ins_05](../img/index/base_index_install_05.png)

6. 选择桌面

   ![ins_06](../img/index/base_index_install_06.png)

7. 分区

   ![ins_07](../img/index/base_index_install_07.png)

8. 手动分区

   ![ins_08](../img/index/base_index_install_08.png)

9. 引导分区

   ![ins_09](../img/index/base_index_install_09.png)

10. 引导分区

    > 之前设置了 4G 的虚拟内存，但是当虚拟内存软件运行满了，
    > 就把限制的软件运行移到 swap 分区

    ![ins_10](../img/index/base_index_install_10.png)

11. ![ins_11](../img/index/base_index_install_11.png)

12. 剩余内存分区

    ![ins_12](../img/index/base_index_install_12.png)

13. 分区配置完成

    ![ins_13](../img/index/base_index_install_13.png)

14. 系统崩溃诊断

    > 正式环境需要打开，因为是测试，所以这里关闭

    > 歇菜了直接打开

    ![ins_14](../img/index/base_index_install_14.png)

15. 网络和主机配置

    ![ins_15](../img/index/base_index_install_15.png)

16. 然后点击 - 开始安装

17. 设置 root 密码

    > 此处设置的是： w19950806

    ![ins_17](../img/index/base_index_install_17.png)

18. 创建用户

    > 用户: chenwei

    > 密码： w19950806

    ![ins_18](../img/index/base_index_install_18.png)

19. 安装完成点击重启

    ![ins_19](../img/index/base_index_install_19.png)

20. 点击进去同意即可

    ![ins_20](../img/index/base_index_install_20.png)

21. 完成配置

    ![ins_21](../img/index/base_index_install_21.png)

22. 然后登录，这里可以选择登录别的用户

    ![ins_22](../img/index/base_index_install_22.png)

23. ![ins_23](../img/index/base_index_install_23.png)

24. ![ins_24](../img/index/base_index_install_24.png)

25. ![ins_25](../img/index/base_index_install_25.png)

26. ![ins_26](../img/index/base_index_install_26.png)

27. 介绍页面直接关闭即可

    ![ins_27](../img/index/base_index_install_27.png)

## 桌面与终端

**进入终端**

> ctrl + alt + f2
>
> 也可以 + f3~6 多开几个终端，多个用户操作
>
> ctrl + alt + f1 切回桌面

![cus_01](../img/index/base_index_cus_01.png)

**终端**

> 桌面右键打开终端

![cus_02](../img/index/base_index_cus_02.png)

**创建文档**

> 点击右上角应用 - 点击工具 - 点击文档编辑器
>
> 输入任意内容，点击保存就会提示保存到哪里了，否则别的位置是没办法创建文档文件的
>
> 不想要的文件永久删除：shift + del

![cus_03](../img/index/base_index_cus_03.png)
