---
layout: default
---
# 控件ID名与指针变量名的命名规则

指针变量名由三部分构成。
分别为固定的小写 **m** 作为前缀 + **ID**名 + **Ptr** 作为结尾  
以ID为 **Textview1** 的控件为例  

![Textview1](assets/textview/Textview1.png) 
 
编译后，生成的对应的指针变量名为  **`mTextview1Ptr`**  

![mTextview1Ptr](assets/textview/mTextview1Ptr.png)  

指针变量的类型根据控件类型而定。 各个控件对应指针类型如下：   
各个类的头文件都可在项目 **jni/include** 文件夹下找到。

| 控件名 | 类名 
|:--------:|:-------:
| ![](assets/qrcode/icon.png)   | ZKQRCode  | 
| ![](assets/edittext/icon.png)   | ZKEditText   |
| ![](assets/button/icon.png)   | ZKButton    |
| ![](assets/textview/icon.png)    | ZKTextView   |
| ![](assets/seekbar/icon.png)   | ZKSeekBar   | 
| ![](assets/pointer/icon.png)   | ZKPointer   | 
| ![](assets/circlebar/icon.png)   | ZKCircleBar   | 
| ![](assets/clock/icon.png)   | ZKDigitalClock   | 
| ![](assets/video/icon.png)   | ZKVideoView   | 
| ![](assets/camera/icon.png)   | ZKCameraView   | 
| ![](assets/window/icon.png) | ZKWindow |
|  ![](assets/list/icon.png)| ZKListView |
|  ![](assets/slidewindow/icon.png) | ZKSlideWindow |
|  ![](assets/diagram/icon.png) | ZKDiagram |

