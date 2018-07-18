---
show_title: false
permalink: /docs/zh/serial_introdoction
key: docs-serial_introdoction-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---
# 串口介绍
为了简化开发流程，使开发人员更多的关注业务逻辑的开发，我们的工具在新建工程时会自动生成串口通讯的代码：  

![](images/Screenshotfrom2018-06-06160506.png)

同时，我们也提供了协议数据与界面交互的回调接口：   

![](images/Screenshotfrom2018-06-06162409.png)

开发人员更多的是关注数据在UI界面上的展示，而通讯部分则由我们的框架自动完成。
通讯框架中的协议解析部分需根据开发人员使用的通讯协议做相应的改动，接下来的[通讯框架讲解](serial_framework)这一章节中我们会重点介绍如何修改。