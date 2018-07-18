---
show_title: false
permalink: /docs/zh/machine_unique_id
key: docs-machine_unique_id-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---
# 机器唯一ID码

我们可以通过 jni/include/security/SecurityManager.h 里的接口获取到机器的唯一码，调用方法如下：
```c++
// id值有8位
unsigned char devID[8];
// 成功返回 true，失败返回 false
bool ret = SECURITYMANAGER->getDevID(devID);
```