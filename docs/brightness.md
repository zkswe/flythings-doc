---
layout: default
---
# 亮度操作
系统的亮度值范围为: 0 ~ 100 ;
操作接口 jni/include/utils/BrightnessHelper.h
```c++
#include "utils/BrightnessHelper.h"

// 获取当前亮度值
BRIGHTNESSHELPER->getBrightness();

// 设置亮度值  brightness: 0 ~ 100
BRIGHTNESSHELPER->setBrightness(brightness);

// 关屏
BRIGHTNESSHELPER->screenOff();

// 开屏
BRIGHTNESSHELPER->screenOn();
```

系统开机起来默认是记忆最后调节的亮度值，如果想要修改为不记忆亮度或设置固定的亮度值，我们可以打开工程的属性进行修改：  

![](images/property_brightness.png)