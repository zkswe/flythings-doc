---
show_title: false
permalink: /docs/zh/adc
key: docs-adc-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---
# ADC操作

目前仅**SV50PB模组**支持该功能，操作接口 jni/include/utils/AdcHelper.h ，使用说明：
```c++
// 所需头文件
#include "utils/AdcHelper.h"

static void testAdc() {
	/**
	 * 设置adc使能状态
	 *
	 * 参数： true 使能， false 禁止   默认是使能状态
	 */
	AdcHelper::setEnable(true);

	for (int i = 0; i < 10; i++) {
		// 读取adc值
		int val = AdcHelper::getVal();
		LOGD("adc val = %d\n", val);
	}
}
```