# How to run the project
  After the project passes [compilation](how_to_compile_flythings.md), it can be put to run on the real machine. According to different equipment models, there are several operating modes as follows:
  
## Use WIFI to connect devices quickly
  This method **only supports models with WIFI**, and the currently supported device models are:  
  
 * sw480272043B_CW  4.3Normal definition capacitor with wifi
 * sw480272043B_CWM 4.3Normal definition capacitor with wifi and network multimedia 
 * sw80480043B_CW  4.3High-definition capacitor with wifi
 * sw48854050B_CW   5 inch Normal definition capacitor with wifi
 * sw80480070A_CW   7 inch Normal definition capacitor with wifi
 * sw80480070A_CWM  7 inch Normal definition capacitor with wifi and network multimedia
 * sw80480070AI_CW     7 inch Normal definition capacitor with wifi
 * sw80480070AI_CWM    7 inch Normal definition capacitor with wifi and network multimedia
 * sw10600070A_CW   7 inch High-definition capacitor with wifi
 
 > [Product model description](board_tag_explain.md)
 
After confirming that the device supports WIFI, follow the steps below to complete the configuration:  
1. First enter the [WIFI setting interface](wifi.md)of the device, and connect the device to the same wireless network as the computer, that is, the computer and the machine must be connected to the same WIFI. (If a different network will cause the subsequent download procedure to fail).  
2. After the wireless network connection is successful, click the menu in the upper right corner of the WIFI setting interface to check the IP address of the device.  
3. At this time, back to the development tools on the computer,On the menu bar, select the menu **Debug Configuration** -> **ADB Configuration**,In the pop-up box, select **WIFI** as the ADB connection method, fill in the IP address of the device, and save the application.
4. After completing the connection configuration, select the [download and debug](adb_debug.md#下载调试) menu item, it will [temporarily](make_image.md) synchronize the project code to the connected device to run.

## Fast operation with USB connected device
For models without WIFI function, almost all support USB cable connection.   **Note: If it has WIFI function, the USB cable connection is invalid.**
  
1. Connect the device to the computer via a USB cable. If the computer can recognize the device as an Android device, the connection is normal. If you can't connect normally, the computer prompts a driver problem, you can try [Download Driver](install_adb_driver.md).
2. When the computer recognizes the device correctly, return to the development tool on the computer, in the menu bar, select the menu **Debug Configuration** -> **ADB Configuration**, in the pop-up box, select the ADB connection method **USB* *, application save.
3. After the configuration is completed, select the [Download and Debug](adb_debug.md#下载调试) menu item, it will [temporarily](make_image.md) synchronize the project code to the connected device to run.


## With TF card, boot from TF card
If for other reasons, both USB and WIFI cannot be used normally or are occupied, you can start the program from the TF card with the help of a TF card.
Specific steps reference [Tutorial-start the program from TF card](start_from_sdcard.md)
