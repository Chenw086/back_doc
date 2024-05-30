---
title: linux - 文件系统
---

# 文件系统

::: info
linux 中一切皆文件
:::

## 目录结构

**概览**

![sys_01](../img/sys_doc/sys_01.png)

- 图形化展示

  ![sys_02](../img/sys_doc/sys_02.png)

  > 带箭头的：说明不是真实路径，此处只是一个链接而已

  ![sys_03](../img/sys_doc/sys_03.png)

swap 目录原理上和 / 同级，但是在逻辑上 swap 在 / 下面。

在 linux 中，每一个文件都对应着一个功能，理论上来说，内容可以乱放

但是乱放不符合规范，应按照下图放置内容

![sys_04](../img/sys_doc/sys_04.png)
