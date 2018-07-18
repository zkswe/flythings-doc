---
show_title: false
permalink: /docs/zh/gpio
key: docs-gpio-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---
# GPIO操作

目前只留了3组io口可以操作
操作接口 jni/include/utils/GpioHelper.h
```c++
#define GPIO_PIN_B_02		"B_02"
#define GPIO_PIN_B_03		"B_03"
#define GPIO_PIN_E_20		"E_20"

class GpioHelper {
public:
	// 返回值：  -1 失败， 1/0(高/低电平) 成功
	static int input(const char *pPin);
	// 返回值：  -1 失败， 0 成功
	static int output(const char *pPin, int val);
};

// 读B02 io口状态
GpioHelper::input(GPIO_PIN_B_02);

// B02 io口输出高电平
GpioHelper::output(GPIO_PIN_B_02, 1);
```