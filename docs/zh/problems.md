---
show_title: false
permalink: /docs/zh/problems
key: docs-problems-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---

# 常见问题
* ## 旧工具创建的项目导入到新工具，编译提示 **ndk-build找不到**  
  如果你安装新工具后，并且将旧工具删除了，那么由旧工具创建的项目，导入到新工具后，编译可能会提示 **ndk-build找不到**。  
  可以通过手动替换下列文件来解决。  
  下载 [z11s项目配置文件](assets/z11sproject-configuration.zip)，解压后，将文件夹内的全部内容拷贝到项目文件夹下，**注意：本操作将会覆盖共三个文件，请注意备份。**
  覆盖文件后，再重启工具即可解决。
  
* ## 在UI主线程中做耗时的操作导致插卡不显示升级界面
界面的刷新显示是在UI主线程中处理的，如果UI主线程中有做一些耗时的操作或者出现程序死循环的情况，就会影响UI的刷新，从而导致插卡不显示升级界面；
`onUI_init`、`onUI_intent`、`onUI_show`、`onUI_hide`、`onUI_quit`、`onUI_Timer`及控件相关的一些回调接口，这些函数都是在UI主线程中调用的，所以出现这种情况，要先检查一下有没有在这些函数中做耗时的操作；
出现这种情况，只能机器插卡重新开机，系统起来后会优先检测是否需要升级，这样就可以正常显示升级界面了。