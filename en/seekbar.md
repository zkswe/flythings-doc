# Slider/progress bar
## How to use the slider control?
In many cases, we will use the progress bar, for example:  
**volume adjustment**  
![](assets/seekbar/example-volume.png)  

Using a few simple pictures, we can quickly achieve this effect.  
1. First, we prepare four resource pictures  
  * Background image    
    ![Background image](assets/seekbar/bg.png)  
  * Effective graph  
    ![Effective graph](assets/seekbar/valid.png)
  * Slider   
     ![Slider](assets/seekbar/c.png)
  * Slider pressed  
    ![Slider pressed](assets/seekbar/c_pressed.png)

2. In the editor, create a slider control  

 ![Create slider](assets/SeekBar-create.gif)
  If you don’t understand how to create controls,[Reference to create a button control](#add_button)
3. The default slider style is transparent, and we must add enough image resources for it to work properly.  
    In the attribute table, we set the **effective image, the image that the slider often displays, the image when the slider is pressed, and the background image** image

      ![为滑块添加资源图片](assets/seekbar/add-photo.gif)
4. After the previous step is completed, the creation of a slider is basically completed. How to preview the sliding effect of the slider in the tool, you can modify it
  **Maximum value** property and **default progress value** property. In the real-time preview, you can see the position change of the slider cursor.

## How to control the progress of the slider in the code? How to get the current progress of the slider?
If we use a slider to implement a volume bar, we must know the progress value of the current volume bar, and once the volume bar changes, we must also adjust the volume simultaneously.  
So, we have the following 3 functions to solve these problems.  
1. Progress value change monitoring function  
  If you create a slider control in the UI file, this function will be automatically added to the corresponding `XXXXLogic.cc` file after **compiling FlyThings**.  
   When sliding the progress bar on the touch screen, or when the current value of the progress bar changes, the system will automatically call this function.
```
  static void onProgressChanged_XXXX(ZKSeekBar *pSeekBar, int progress) {
      //LOGD("The progress value of the XXXX slider changes to %d !\n", progress);
}
```
2. `void setProgress(int progress)`  
  Used to set the current progress of the slider. E.g:  
  ```  
  //Set the slider progress to 28
  mSeekbarPtr->setProgress(28)
  ```
3. `int getProgress()`  
  Used to get the progress value of the current slider. E.g:  
  ```
  int progress = mSeekbarPtr->getProgress();
  LOGD("The current progress value of the slider %s", progress);
  ```


## Sample code  
For more use of slider controls, please refer to SeekBarDemo project in [Sample Code](demo_download.md#demo_download)

Sample preview effect diagram:  

![效果图](assets/seekbar/preview.png)
