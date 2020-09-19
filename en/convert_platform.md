# Conversion project platform

In order to facilitate the use of the same project source code on different hardware platforms, the function of **Conversion and Compilation Platform** is provided.

Steps:
  1. Select the project name, right-click, and select **Convert Compilation Platform** in the pop-up context menu to quickly switch platforms.

  ![](assets/convert_platform.png)

# For the conversion function, you need to pay attention to the following points:
  1. The conversion function is essentially to reconfigure the compilation environment such as the compilation tool chain, without any changes to the source code.
  2. The hardware of different platforms is different, so the hardware-related settings such as serial port and GPIO need to be modified manually.
  3. Due to differences in toolchain versions, compilation failures may occur after conversion. This also requires manual modification of Makefile or standard source code to solve.