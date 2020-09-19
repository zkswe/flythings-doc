# Screen backlight operation
* Required header files  
  ```c++
  #include "utils/BrightnessHelper.h"
  ```
  
## Dimming
* Adjust the backlight brightness  
  The brightness range is **0 ~ 100** (Note: 0 does not mean turning off the screen)
     
  ```c++
  //Adjust the screen brightness to 80
  BRIGHTNESSHELPER->setBrightness(80);
  ```
* Get the current brightness value
  ```c++
  BRIGHTNESSHELPER->getBrightness();
  ```
  
## Switch screen backlight

* Turn off the screen
    ```c++
    BRIGHTNESSHELPER->screenOff();
    ```
* Open screen
    ```c++
    BRIGHTNESSHELPER->screenOn();
    ```

## Memory brightness
When the system is turned on, the default is to memorize the last adjusted brightness value. If you want to modify it to not remember the brightness or set a fixed brightness value, you can open the properties of the project to modify:  

  ![](images/property_brightness.png)