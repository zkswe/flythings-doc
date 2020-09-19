# Button class
## <span id = "add_button">I need a button/button, how to add and modify attributes?</span>
If you need a button/button, you can quickly implement it using the existing `Button` control. The specific steps are as follows:
1. Double-click to open the UI file.
2. Find the `Button` control in the control set on the right.
3. Left-click the `Button` control and hold it, then drag it to any position, release the left button, and you can see the automatically generated button control.
4. Left-click the button control you just created, and you can see the related properties of the control on the right side of the editor. In this attribute form, you can freely modify the attributes like filling in an Excel sheet!

   ![Create Button](assets/Button-create.gif)
## How to modify the button/button color?
Reference [How to modify the color of text](textview.md#change_color)
## <span id = "add_button_style">How to add more animation effects to the button?</span>
Reference [How to use pictures to enrich the style of buttons/keys](#add_multi_state_photo_for_button)
## <span id = "add_multi_state_photo_for_button">
How to use pictures to enrich the style of buttons/keys</span>
The default button control is pure color, which looks a bit boring. But you can add pictures to beautify the buttons.
Here are the specific steps:
 1. First add a button control to the UI file.[How to add button controls](#add_button)
 2.  Left-click to select the button control you just added, and you can see the button's attribute table in the attribute column on the right side of the editor.  
It is observed that among all the attributes, the attributes related to the picture are:
  * Picture settings  
      - This attribute can set the pictures in each state of the button, so that the button can automatically switch the corresponding picture according to the change of the state
  * Picture location
     - By default, the picture is centered and zoomed to fill the entire button rectangle. You can adjust the position of the picture and zoom in or out.
  * Background image
     - Set the picture as the background of the button. The picture will cover the entire rectangular area of the button and automatically zoom.

Specific examples:   

![Button-pic-example](assets/Button-pic-example.png "按键属性示例")

  Effect picture:  

![Button-pic-example](assets/Button-pic-preview.png "按键属性示例")

The above figure is a screenshot of the parameter part of the attribute table image, and its meaning is:    
  The button displays on.png by default, and it displays off.png when the button is selected;  
   The four parameters of the left, top, width, and height of the picture determine the display area of the picture (in pixels), the upper left corner of the button rectangle area is the starting point coordinates (0, 0), right and downward is the positive direction, The end point coordinates are (67, 31). If the actual width and height of the picture are not equal to the specified width and height parameters, the picture will be scaled according to the specified width and height: 

  ![图片位置坐标示例](assets/Button-location.png)

### Understand the hierarchical relationship of button controls  
For general button controls, it will draw four levels of content, which are from top to bottom:
* The text of the button
* Button picture
* Button background image
* Button background color

## How to add picture buttons/buttons?
Reference [How to add more animation effects to buttons](#add_multi_state_photo_for_button)

## When this key/button is pressed, where or how can I add my own operation code?
In actual development, `Button` is a kind of control that is used very frequently. Often after the button click event occurs, some processing is done, such as writing to the serial port or refreshing the UI content.
To respond to the click time of the button is very simple. The following are the specific steps:
1. First create a `Button` control, and name the property ID as `Button1`. [How to create a button control](#add_button)

   ![ID属性示例](assets/Button-properties-id-button1.png)
2. In the `Project Explorer`, select the current project, right-click, and select the `Compile FlyThings`  option in the pop-up menu。The function of this step is to **automatically generate template code** 。 [Learn more about code generation details](ftu_and_source_relationships.md#ftu_and_source_relationships)
3. Take the UI file `main.ftu` as an example,After the previous step is completed, the file `jni/logic/mainLogic.cc` will be generated under the current project folder, as shown below:

   ![](assets/Button-callback-generate.png) <br/>
  Note： `main.ftu` corresponds to `mainLogic.cc`,the prefixes of both are the same. [Learn more about code generation details](ftu_and_source_relationships.md#ftu_and_source_relationships)
4. Double-click to open `mainLogic.cc` , you should see the following function at the end of the file,
```c++
static bool onButtonClick_Button1(ZKButton *pButton) {
	//LOGD(" ButtonClick Button1 !!!\n");
	return false;
}
```
When the `Button` control is clicked on the serial port screen, the system will automatically call the associated function. So, if you need to add your own processing code, just write it directly in the associated function.

 *  It can be seen that the function name is generated according to certain rules. Take the `Button` control as an example, its function name generation rule is
`onButtonClick_XXXX(ZKButton *pButton)`,where **XXXX**will be replaced with the control ID,
So multiple button controls will generate different associated functions.

[Learn more about related functions of controls](relation_function.md#relation_function)

## System Button
In addition to the ID value defined by the button, the button also retains two system button values:`sys_back` and `sys_home`,From the name, we can roughly know their functions: **Back Button** 和 **Home button**  ; Click the back button, the interface will return to the previous interface, if you enter a multi-level interface, click the Home button to directly return to the main interface (start interface). We only need to set the ID value to `sys_back` or `sys_home` in the attribute box of the button to achieve the corresponding function.

![](images/Screenshotfrom2018-06-06220522.png)

[Learn more about interface interaction](open_close_app#close_app.md)

## How to deal with long key press events
If you need to handle the long press event of the button, you need to manually add the long press event listener. Specific steps are as follows:  
1. In the **attribute table** of the button,set the **long press event trigger time** and **long press event cycle trigger interval** two attributes; in the figure below, I set them to 1000 respectively , 1000, the unit is milliseconds.

   ![](assets/button/property_longclick.jpg)

2. After setting the properties, compile and open the corresponding Logic.cc file; at the top of the file, declare `class LongClickListener`,and inherit the `ZKBase::ILongClickListener`class to implement the `virtual void onLongClick(ZKBase *pBases)` method.

    ```c++
    namespace { //Add an anonymous scope to prevent multiple source files from defining the same class name and conflict at runtime

    //Implement the long press monitoring interface
    class LongClickListener : public ZKBase::ILongClickListener {

             virtual void onLongClick(ZKBase *pBase) {  
                    LOGD("Trigger long press event");
                    static int count = 0;

                    char buf[128] = {0};
                    snprintf(buf, sizeof(buf), "long press event trigger times %d", ++count);
                    //Each time a long press event is triggered, modify the text of the button
                    mLongButtonPtr->setText(buf);
             }
    };

    }
    ```
3. Next, instantiate the monitor class defined in the previous step and declare it as a static type

    ```c++
    static LongClickListener longButtonClickListener;
    ```

4. Register button long press monitoring in `static void onUI_init()` function  

    ```c++
    static void onUI_init(){

            //Long press the registration button to monitor
            mLongButtonPtr->setLongClickListener(&longButtonClickListener);
    }
    ```
5. Cancel the button long press monitoring in the `static void onUI_quit()` function

    ```c++
    static void onUI_quit() {
           //Cancel button long press to monitor
           mLongButtonPtr->setLongClickListener(NULL);
    }
    ```
6. After adding the code, compile, download the program to the machine, and long press to test; you can see that the text of the button has been modified and the `onLongClick` function successfully responded.
For specific implementation, please refer to [Sample Code](demo_download.md#demo_download)

## How to handle key touch events  
If you need to respond when the button **press**
or **lift** , you can register the touch monitoring interface to do so. Specific steps are as follows:  
1. Implement your own touch monitoring interface:
    ```c++
    namespace {	// Add an anonymous scope to prevent multiple source files from defining the same class name and conflict at runtime

    // Implement touch monitoring interface
    class TouchListener : public ZKBase::ITouchListener {
    public:
        virtual void onTouchEvent(ZKBase *pBase, const MotionEvent &ev) {
            switch (ev.mActionStatus) {
            case MotionEvent::E_ACTION_DOWN:
                mTouchButtonPtr->setText("press");
                break;
            case MotionEvent::E_ACTION_UP:
                mTouchButtonPtr->setText("lift up");
                break;
            default:
                break;
            }
        }
    };

    }
    ```
2.Next, instantiate the monitor class defined in the previous step and declare it as a static type  

    ```c++
    static TouchListener sTouchListener;
    ```
3.Register the button touch monitor in the `static void onUI_init()` function  

    ```c++
    static void onUI_init() {
        //Register button touch monitor
        mTouchButtonPtr->setTouchListener(&sTouchListener);
    }
    ```
4.Cancel button touch monitoring in  `static void onUI_quit()` function

    ```c++
    static void onUI_quit() {
        //Cancel button touch monitoring
        mTouchButtonPtr->setTouchListener(NULL);
    }
    ```
5.After adding the code, compile, download the program to the machine, click touch test; you can see that the text of the button has been modified.
For specific implementation, please refer to [Sample Code](demo_download.md#demo_download)  

## Sample code  

Since there are many button control attributes, please refer to the ButtonDemo project in [Sample Code](demo_download.md#demo_download) for more attribute effects.
Sample preview effect diagram:    

![效果图](assets/button/preview.png)
