---
show_title: false
permalink: /docs/zh/serial_configuration
key: docs-serial_configuration-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---
# 如何配置串口
## 串口号的选择
    
  由于软件与硬件的兼容问题，导致软件串口号与硬件上的串口号标识不同，具体对应关系如下：

* Z11系列平台 

    | 软件串口号 | 硬件串口号 
    |:--------:|:-------:
    | ttyS   | UART  | 
    | ttyS   | UART  | 

* z6系列平台  

    | 软件串口号 | 硬件串口号 
    |:--------:|:-------:
    | ttyS   | UART  | 
    | ttyS   | UART  | 

## 串口波特率配置
1. 新建工程时配置波特率  

  ![](images/730034409.jpg)

2. 工程属性修改波特率
  右键工程, 在弹出框中选择 Properties 选项, 弹出如下属性框  

  ![](images/918330052.jpg)

## 串口打开与关闭
打开源码路径 jni/Main.cpp；我们可以看到在程序初始化和销毁时分别有对串口打开和关闭的操作

```c++
void onEasyUIInit(EasyUIContext *pContext) {
    LOGD("onInit\n");
    // 打开串口
    UARTCONTEXT->openUart(CONFIGMANAGER->getUartName().c_str(), CONFIGMANAGER->getUartBaudRate());
}

void onEasyUIDeinit(EasyUIContext *pContext) {
    LOGD("onDestroy\n");
    // 关闭串口
    UARTCONTEXT->closeUart();
}
```