## ADC operation

> [!Note]
> 1. Currently only **SV50P series modules** support this function.
> 2. Before use, you need to enable the **ADC** function in [Module Configuration](https://superv.flythings.cn) and upgrade with the new system package generated before it can be used normally.
> 3.  More [Usage Tutorial](core_module.md)。

### Introduce header files

  ```c++
  #include "utils/AdcHelper.h"
  ```

### Specific operation

  ```c++
  #include "utils/AdcHelper.h"

  static void testAdc() {
	/**
	 * Set the adc enable state
	 *
	 * @param true enable
	 *        false forbidden 
	 *        The default is the enabled state
	 */
	AdcHelper::setEnable(true);

	for (int i = 0; i < 10; i++) {
	  // Read adc value
	  int val = AdcHelper::getVal();
	  LOGD("adc val = %d\n", val);
	}
  }
  ```