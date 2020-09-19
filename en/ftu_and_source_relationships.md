
# <span id = "ftu_and_source_relationships">FlyThings compilation process and the correspondence between UI files and source code</span>
## How the controls in the UI file are associated with pointer variables
FlyThings separates the UI from the code for easy management.
In the following, UI files refer to all **ftu**  files in the **ui**  folder of the project.
In order to reduce the repetitive code written during development, we improved the compilation process. Before the real source code is compiled, the tool will generate a`Logic.cc`  file with the same prefix name according to the UI file. For example, `main.ftu`will generate a paired `mainLogic.cc`file. Here you need to pay attention to:  
The generation of the `Logic.cc`file is not a direct overwrite, but an incremental modification.  
When compiling, the tool will traverse each UI file and read the controls contained in the UI file. And declare a pointer variable for this control, in the code, through this pointer, you can operate the corresponding control. Pointer variables are defined in the `Activity.cpp`  file with the same prefix name. Take **main.ftu** as an example, like this:  

![](assets/global_control_pointer.png)  

**As you can see in the figure, all pointers are static global variables, and they all have the same naming rules. For specific naming rules, please refer to [Naming Rules for Control ID Names and Pointer Variable Names](named_rule#id_name_rule.md); and, You should also notice the statement `#include "logic/mainLogic.cc"` in the screenshot, which includes the `mainLogic.cc`file into `mainActivity.cpp` , and our business code is written in `mainLogic.cc`  file, so we can fully use these control pointers in `mainLogic.cc`.**  
If you are interested in the initialization of these pointers, you can find it in the `onCreate` method of `mainActivity`.

## The relationship between UI files and Logic.cc files
Now, you probably already know how the controls in the UI file are connected to these pointers. Let's take a look at what code is automatically generated for us in the `mainLogic.cc` file.  
If you don't add any controls to your UI file, your `mainLogic.cc` file will look like this:  

```c++ 
/**
 * Register timer
 * Fill the array to register the timer
 * Note: id cannot be repeated
 */
static S_ACTIVITY_TIMEER REGISTER_ACTIVITY_TIMER_TAB[] = {
	//{0,  6000}, //Timer id=0, interval of 6 seconds
	//{1,  1000},
};

/**
 * Triggered when the interface is constructed
 */
static void onUI_init(){
    //Tips : Add the display code for UI initialization here, such as: mText1Ptr->setText("123");

}

/**
 * Triggered when switching to this interface
 */
static void onUI_intent(const Intent *intentPtr) {
    if (intentPtr != NULL) {
        //TODO
    }
}

/*
 * Triggered when the interface is displayed
 */
static void onUI_show() {

}

/*
 * Triggered when the interface is hidden
 */
static void onUI_hide() {

}

/*
 * Triggered when the interface completely exits
 */
static void onUI_quit() {

}

/**
 * Serial data callback interface
 */
static void onProtocolDataUpdate(const SProtocolData &data) {

}

/**
 * Timer trigger function
 * It is not recommended to write time-consuming operations in this function, otherwise it will affect UI refresh
 * Parameters: id
 * The id of the currently triggered timer is the same as the id at registration
 * Return value: true
 * Continue to run the current timer
 * false
 * Stop running the current timer
 */
static bool onUI_Timer(int id){
	switch (id) {

		default:
			break;
	}
    return true;
}

/**
 * Triggered when there is a new touch event
 * Parameters: ev
 * New touch event
 * Return value: true
 * Indicates that the touch event is intercepted here, and the system will no longer pass this touch event to the control
 * false
 * Touch events will continue to be passed to the control
 */
static bool onmainActivityTouchEvent(const MotionEvent &ev) {

	return false;
}
```
The specific functions of these functions are as follows:
* **REGISTER_ACTIVITY_TIMER_TAB[ ] array**  
 Used for [register timer](timer.md#timer); the array member type is the following structure
```c++
typedef struct {
	int id; // Timer ID, cannot be repeated
	int time; // Timer time interval in milliseconds
}S_ACTIVITY_TIMEER;
```
**In essence, this array will be referenced in the `rigesterActivityTimer()` function of  `mainActivity.cpp`and registered to the system in turn by calling the `void registerTimer(int id, int time)`method.**

* **void onUI_init()**  
 Used for interface initialization, if you need to initialize some content when opening this UI interface, then you can add code to this function.  
 In essence, this method will be called in the `onCreate()` method of `mainActivity.cpp` . You can understand it as the structure of `mainActivity`.

* **void onUI_quit()**  
 Used to exit the interface, if you need to do some operations when the UI interface exits, then you can add the code to this function.
In essence, this method will be called in the destructor of `mainActivity.cpp`

* **void onProtocolDataUpdate(const SProtocolData &data)**  
  Used to receive serial port data. When the serial data frame is parsed, this function will be called.
 The essence is that in `onCreate()` of `mainActivity.cpp`, `void registerProtocolDataUpdateListener(OnProtocolDataUpdateFun pListener)`  is called by default to register to receive serial port data, and the registration is cancelled in the destruction of `mainActivity.cpp`. When the serial port reads the data, the registered UI interface is called in turn through the `void notifyProtocolDataUpdate(const SProtocolData &data) ` in `ProtocolParser.cpp`.
This is the serial port analysis function in `ProtocolParser.cpp`, combined with the process described above, you should be able to understand how the serial port data is distributed on each interface:

    ```c++
    /**
     * Analyze each frame of data
     */
    static void procParse(const BYTE *pData, UINT len) {
        switch (MAKEWORD(pData[3], pData[2])) {
        case CMDID_POWER:
            sProtocolData.power = pData[5];
            break;
        }

        // Notify protocol data update
        notifyProtocolDataUpdate(sProtocolData);
    }
    ```

* **bool onUI_Timer(int id)**  
Timer callback function; when a timer reaches the specified time interval, the system will call this function. When multiple timers are added, you can use the **id** parameter to distinguish the timers. The **id** parameter is the same as the id filled in the structure array above.  
Return `true`  to continue running the current timer;  
Return `false` to stop running the current timer;  
If you stopped the timer by returning `false` , how do you start it again? You can refer to  [How to start and stop the timer arbitrarily](how_to_register_timer.md)
* **bool onmainActivityTouchEvent(const MotionEvent &ev)**  
  Touch event callback function. Able to get all touch messages.
 Similarly, this function is also registered by default in `mainActivity.cpp` through the `registerGlobalTouchListener`method; touch messages can only be obtained after registration.
 Returning `true` means that the touch event is intercepted here and is no longer passed to the control
 Returning `false` means that touch events will continue to be passed to the control  
 [Learn more about the handling of touch events](motion_event.md)
 
 
The above is Logic.cc generated by compiling the default UI file. When we add controls to the UI file and compile again, the tool will generate different associated functions according to different controls to the corresponding Logic.cc file.
For example: I added two button controls to the UI file of **main.ftu** , their IDs are `Button1` and `Button2`, then, after compilation, in the **mainLogic.cc** file The following two correlation functions are generated in  
```c++
static bool onButtonClick_Button1(ZKButton *pButton) {
    //LOGD(" ButtonClick Button1 !!!\n");
    return false;
}

static bool onButtonClick_Button2(ZKButton *pButton) {
    //LOGD(" ButtonClick Button2 !!!\n");
    return false;
}
```
Pay attention to the naming of the function. The function name contains the ID name of the control, so we require the ID naming of the control to conform to the C language naming standard.
If you keep adding controls, more related functions will be generated into the **mainLogic.cc** file after compilation.  
Usually, during development, we will add, delete, and modify controls many times in the UI file. For these situations, the current solutions are as follows:  
 * For the case of adding a control, the tool will generate a correlation function based on the control ID name when compiling. If the same correlation function already exists, it will be skipped. Will not have any impact on the **Logic.cc** file.
 * For deleting controls, if you delete an existing control in the UI file, the tool will not delete its associated function. If the associated function is also deleted, it is likely to cause the loss of customer code, so we choose to keep it.
 * For the modification of the control, the generation of the associated function is only related to the control ID name. If you modify the properties of the control in addition to the ID name in the UI file, it will not affect the associated function; if you modify the control ID name Attribute, when compiling, it will be processed according to the situation of adding controls, and the old associated functions are retained.


**We only took button controls as an example to describe the relationship between the controls in the UI file and the associated functions generated in Logic.cc. FlyThings also provides associated functions for generating other controls, such as sliders, lists, and sliding windows. , To understand the correlation function of other controls, please refer to [Explanation of the correlation function automatically generated by the control](named_rule.md#relation_function)**

<br/>

**Finally, use a picture to summarize the correspondence between the ftu file and the code:**
![](assets/relationships.png)