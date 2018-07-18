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