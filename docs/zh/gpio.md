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

操作接口 jni/include/utils/GpioHelper.h

```c++
class GpioHelper {
public:
	// 返回值：  -1 失败， 1/0(高/低电平) 成功
	static int input(const char *pPin);
	// 返回值：  -1 失败， 0 成功
	static int output(const char *pPin, int val);
};
```

* Z11S平台上 <br/>
目前只留了3组io口可以操作：

```c++
// 3组io口定义
#define GPIO_PIN_B_02		"B_02"
#define GPIO_PIN_B_03		"B_03"
#define GPIO_PIN_E_20		"E_20"


#include "utils/GpioHelper.h"

// 读B02 io口状态
GpioHelper::input(GPIO_PIN_B_02);

// B02 io口输出高电平
GpioHelper::output(GPIO_PIN_B_02, 1);
```

* SV50PB模组 <br/>
有以下12组io口可以操作：

```c++
// 12组io口定义
#define GPIO_PIN_7		"PIN7"
#define GPIO_PIN_8		"PIN8"
#define GPIO_PIN_9		"PIN9"
#define GPIO_PIN_10		"PIN10"
#define GPIO_PIN_11		"PIN11"
#define GPIO_PIN_12		"PIN12"
#define GPIO_PIN_13		"PIN13"
#define GPIO_PIN_14		"PIN14"
#define GPIO_PIN_23		"PIN23"
#define GPIO_PIN_24		"PIN24"
#define GPIO_PIN_26		"PIN26"
#define GPIO_PIN_27		"PIN27"


#include "utils/GpioHelper.h"

// 读PIN_7 io口状态
GpioHelper::input(GPIO_PIN_7);

// PIN_7 io口输出高电平
GpioHelper::output(GPIO_PIN_7, 1);
```