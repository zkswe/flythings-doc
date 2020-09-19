## GPIO operation

> [!Note]
> 1. If you purchased **SV50PB module** or **SV50PC module**, you need to enable it in [Module Configuration](https://superv.flythings.cn) **GPIO** function, and then re-upgrade the system, it can be used normally.
> 3. More [Usage Tutorial](core_module.md)。

### Introducing header files
```c++
#include "utils/GpioHelper.h"
```


### Operation function
```c++
class GpioHelper {
public:
    /**
	 * Set the pin to input mode and return to the 		high and low state of the pin
	 * @param pPin pin name
     * @return -1 operation failed
	 * 1 high level
	 * 0 low level
	 */
	static int input(const char *pPin);
	/**
	 *  Set the pin to output mode, and specify the 	output high or low level
	* @param pPin pin name
	* @param val 1 high level
	* 0 low level
	* @return -1 failed
	* 0 success
	 */
	static int output(const char *pPin, int val);
};
```


### Definition of the name of each platform operable pin

  * Z11S platform

    Currently the platform only retains 3 groups of io ports for operation.
  
  ```c++
    // 3 groups of io port definitions
    #define GPIO_PIN_B_02		"B_02"
    #define GPIO_PIN_B_03		"B_03"
    #define GPIO_PIN_E_20		"E_20"
        
    #include "utils/GpioHelper.h"

    // read B02 io port status
    GpioHelper::input(GPIO_PIN_B_02);

    // B02 io port outputs high level
    GpioHelper::output(GPIO_PIN_B_02, 1);
  ```

  * SV50PB module

    The following 12 groups of io ports can be operated:

  ```c++
    // SV50PB
    #define SV50PB_PIN7         "PIN7"
    #define SV50PB_PIN8         "PIN8"
    #define SV50PB_PIN9         "PIN9"
    #define SV50PB_PIN10        "PIN10"
    #define SV50PB_PIN11        "PIN11"
    #define SV50PB_PIN12        "PIN12"
    #define SV50PB_PIN13        "PIN13"
    #define SV50PB_PIN14        "PIN14"
    #define SV50PB_PIN23        "PIN23"
    #define SV50PB_PIN24        "PIN24"
    #define SV50PB_PIN26        "PIN26"
    #define SV50PB_PIN27        "PIN27"

    #include "utils/GpioHelper.h"

    // ead PIN7 io port status
    GpioHelper::input(SV50PB_PIN7);

    // PIN7 io port outputs high level
    GpioHelper::output(SV50PB_PIN7, 1);
  ```

  * SV50PC module

    The following 25 groups of io ports can be operated:

 ```c++
    // SV50PC
    #define SV50PC_PIN2         "PIN2"
    #define SV50PC_PIN3         "PIN3"
    #define SV50PC_PIN4         "PIN4"
    #define SV50PC_PIN5         "PIN5"
    #define SV50PC_PIN6         "PIN6"
    #define SV50PC_PIN7         "PIN7"
    #define SV50PC_PIN8         "PIN8"
    #define SV50PC_PIN9         "PIN9"
    #define SV50PC_PIN10        "PIN10"
    #define SV50PC_PIN11        "PIN11"
    #define SV50PC_PIN13        "PIN13"
    #define SV50PC_PIN14        "PIN14"
    #define SV50PC_PIN15        "PIN15"
    #define SV50PC_PIN16        "PIN16"
    #define SV50PC_PIN17        "PIN17"
    #define SV50PC_PIN18        "PIN18"
    #define SV50PC_PIN22        "PIN22"
    #define SV50PC_PIN24        "PIN24"
    #define SV50PC_PIN25        "PIN25"
    #define SV50PC_PIN26        "PIN26"
    #define SV50PC_PIN27        "PIN27"
    #define SV50PC_PIN28        "PIN28"
    #define SV50PC_PIN29        "PIN29"
    #define SV50PC_PIN30        "PIN30"
    #define SV50PC_PIN31        "PIN31"

    #include "utils/GpioHelper.h"

    // read PIN7 io port status
    GpioHelper::input(SV50PC_PIN7);

    // PIN7 io port outputs high level
    GpioHelper::output(SV50PC_PIN7, 1);
 ```
 
  * 86 boxes

    The following 4 groups of io ports can be operated:

 ```c++
    // 86 Box
    #define Z6X86BOX_PIN7         "PIN7"	// corresponds to IO1 on the hardware
    #define Z6X86BOX_PIN8         "PIN8"	// IO2
    #define Z6X86BOX_PIN9         "PIN9"	// IO3
    #define Z6X86BOX_PIN10        "PIN10"	// IO4

    #include "utils/GpioHelper.h"

    // read PIN7 io port status
    GpioHelper::input(Z6X86BOX_PIN7);

    // PIN7 io port outputs high level
    GpioHelper::output(Z6X86BOX_PIN7, 1);
 ```

### Sample
The complete source code can be found in the **GpioDemo** project in [**Sample Code Package**](demo_download.md#demo_download)
