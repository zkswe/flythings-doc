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
// SV50PB
#define SV50PB_PIN7			"PIN7"
#define SV50PB_PIN8			"PIN8"
#define SV50PB_PIN9			"PIN9"
#define SV50PB_PIN10		"PIN10"
#define SV50PB_PIN11		"PIN11"
#define SV50PB_PIN12		"PIN12"
#define SV50PB_PIN13		"PIN13"
#define SV50PB_PIN14		"PIN14"
#define SV50PB_PIN23		"PIN23"
#define SV50PB_PIN24		"PIN24"
#define SV50PB_PIN26		"PIN26"
#define SV50PB_PIN27		"PIN27"


#include "utils/GpioHelper.h"

// 读PIN7 io口状态
GpioHelper::input(SV50PB_PIN7);

// PIN7 io口输出高电平
GpioHelper::output(SV50PB_PIN7, 1);
```

* SV50PC模组 <br/>
有以下25组io口可以操作：

```c++
// SV50PC
#define SV50PC_PIN2			"PIN2"
#define SV50PC_PIN3			"PIN3"
#define SV50PC_PIN4			"PIN4"
#define SV50PC_PIN5			"PIN5"
#define SV50PC_PIN6			"PIN6"
#define SV50PC_PIN7			"PIN7"
#define SV50PC_PIN8			"PIN8"
#define SV50PC_PIN9			"PIN9"
#define SV50PC_PIN10		"PIN10"
#define SV50PC_PIN11		"PIN11"
#define SV50PC_PIN13		"PIN13"
#define SV50PC_PIN14		"PIN14"
#define SV50PC_PIN15		"PIN15"
#define SV50PC_PIN16		"PIN16"
#define SV50PC_PIN17		"PIN17"
#define SV50PC_PIN18		"PIN18"
#define SV50PC_PIN22		"PIN22"
#define SV50PC_PIN24		"PIN24"
#define SV50PC_PIN25		"PIN25"
#define SV50PC_PIN26		"PIN26"
#define SV50PC_PIN27		"PIN27"
#define SV50PC_PIN28		"PIN28"
#define SV50PC_PIN29		"PIN29"
#define SV50PC_PIN30		"PIN30"
#define SV50PC_PIN31		"PIN31"


#include "utils/GpioHelper.h"

// 读PIN7 io口状态
GpioHelper::input(SV50PC_PIN7);

// PIN7 io口输出高电平
GpioHelper::output(SV50PC_PIN7, 1);
```
