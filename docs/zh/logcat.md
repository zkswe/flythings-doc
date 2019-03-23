---
show_title: false
permalink: /docs/zh/logcat
key: docs-logcat-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---

# 查看日志
## 添加日志
* 所需头文件  
  ```c++
  #include "utils/Log.h"
  ```
  FlyThings 的打印统一调用 `LOGD` 或 `LOGE` 宏输出，使用方法与C语言的`printf`相同 ; 默认生成的代码里就有调用的例子（默认被注释掉，需要时打开）：

    ```c++
    static bool onButtonClick_Button1(ZKButton *pButton) {
        LOGD("onButtonClick_Button1\n");
        return true;
    }
    ```

## 查看打印
我们有2种方式可以查看打印日志： **串口工具** 和 **ADB**；
* 用SecureCRT工具或者其他串口工具连接板子，打开串口（波特率设置为**115200**）。在终端上输入 **logcat** 后回车，点击屏上测试程序的按钮，会有如下打印输出：

   ![](images/logcat_zkgui.png)

如果打印过多，我们可以先输入 **logcat -c** 清除之前的打印，再在终端上输入 **logcat** 查看打印；
* 连接好 [ADB](adb_debug) 后，可以通过我们的工具查看程序的打印日志。 具体操作步骤如下：

  1.在菜单栏上 选择 **调试配置** -> **切换日志窗口** ，工具会切换到另一个界面。
 
   ![](assets/ide/log_perspective.png)

  2.在新界面的左下角，选中 **LogCat** , 如果连接正常，在右侧红框区域，你将看到机器的打印日志。

   ![](assets/ide/log_view.png)
 
   如果你想回到代码编辑界面， 在工具的右上角，点击 **FlyThings**的图标即可。
     ![](assets/ide/perspective_fly.png)
