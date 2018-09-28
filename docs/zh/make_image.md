---
show_title: false
permalink: /docs/zh/make_image
key: docs-make_image-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---
# 制作升级镜像
我们可以将程序打包制作升级镜像，机器升级后，就可以将程序保留在机器内部，一上电，默认就会启动该应用。

## 操作具体步骤  
首先我们要配置镜像的输出目录。
1. 找到工具栏上的这个按钮  

   ![](assets/ide/toolbar_image.png)   

2. 点击旁边的黑色下拉箭头，在弹出的菜单中选择 **路径配置**    

   ![](assets/ide/toolbar_image23.png)

3. 在弹出框中，选择镜像文件的输出目录，点击确定 。
 
4. 在上面的步骤中，我们配置好了输出目录，现在点击下图中的按钮开始编译，它会将编译结果  打包，并生成 **update.img** 文件输出到配置的目录下。  

     ![](assets/ide/toolbar_image3.png) 

6. **update.img** 文件成功生成后，将其拷贝到SD卡里(**注意：使用前，请将SD卡格式化为FAT32格式**)，将SD卡插入机器中，机器重新上电，这时候，系统检测到SD卡里的文件，就会启动升级程序，在下图的界面中，勾选升级的项目，点击升级。升级完成后及时拔掉升级卡，防止重复升级。    
  > **注意：SD卡仅支持FAT32格式**
  
   ![](images/screenshot_1513263522327.png)