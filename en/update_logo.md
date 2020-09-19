# Boot LOGO
## Update boot logo
1.  First prepare a boot LOGO picture, the picture must meet the following conditions:  
  1. The picture name is fixed as `boot_logo.JPG`. Note that the file suffix is capitalized **JPG**; other names will not be recognized. 
    **Users of Windows system computers must open the "Show Extensions" function of the Explorer to ensure that the complete file name is correct**.    
  2. The picture resolution must be exactly the same as the screen resolution, in pixels.
  3. The picture should not be too large, otherwise the upgrade will fail. It is best to keep it within **100KB** , but the size supported by different system versions is also different.  
     Since the supported compression algorithms are limited when the system is turned on, the size displayed on the computer does not represent the occupied size after decompression and recompression in the system.
  4. During the upgrade, if it prompts "The image is larger than the partition size", it means that the picture is still too large for the system version.
  5. The boot LOGO picture should be as simple as possible **It is strongly recommended to use a solid color as the background, plus simple icons or text, which can effectively reduce the picture size.**;

2.  Copy `boot_logo.JPG` to the root directory of the TF card
3.  Insert the TF card into the machine, and the device will automatically pop up an upgrade prompt. Select `boot_logo` and click upgrade.
4.  The system will shut down and restart after the upgrade is complete. Pull out the TF card at this time. Prevent the system from being upgraded again. 
    ![](images/boot_logo_upgrade.jpg)


## Richer "boot LOGO"
The boot LOGO has limited functions. If you have more abundant needs, you can use the following methods to achieve
1. Use a pure black picture to upgrade to the boot LOGO.
2. The first interface of the application is regarded as your "boot LOGO"
3. Try not to have time-consuming operations on the first interface of the application, otherwise it will slow down the startup time of the program.

## Extend the display time of the boot LOGO
The time to turn on the LOGO depends on the startup time of the application.
After the first interface of the application is fully loaded, the boot LOGO will be overwritten.
So as long as the `sleep` operation is added to the `onUI_init` function of the first interface, the display time of the boot LOGO can be extended in disguised form.

