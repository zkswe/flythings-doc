# Single selection group RadioGroup
For multiple options, single selection, we can directly use the `RadioGroup` control.  
When one of the options is clicked, the option will automatically switch to the selected state, and other options in the same group will become non-selected. While these options are switching states, they will also be automatically switched according to the pictures and colors set in the properties.

## How to use
1. Double click to open the UI file
2. Find the `RadioGroup` control set in the control set on the right   
   ![](assets/radiogroup/r1.png)  
   ![](assets/radiogroup/option.png) 
3. Click the left mouse button on the `Radio Group` control and hold it, then drag it to any position, release the left button, and you can see a rectangular area is automatically generated.  
   It represents a container that can hold the `option` control.  
4. You can use the same drag and drop operation to add multiple `option` controls to the rectangular area just now.  
5. Left-click the added `option` control, and you can see its related properties on the right side of the editor.    
   You can set the picture of each state of each option and the color of each state according to your needs. Here, pay attention to the **image and color** attributes when selected.  
  
  ![](assets/radiogroup/properties.png)  
  
  If you set a picture and find that the size of the picture is displayed abnormally, you can adjust the position and size of the picture in the **Picture Position** property.  
  We can also set **selected** or **unselected** in the **default state** property
6. Compile after the properties are set, and its associated functions will be generated in the corresponding `Logic.cc`.  
   When you click on one of the options, the associated function will be called by the system, where the parameter `int checkedID` represents the `ID` of the selected option.  
   We can determine which option is currently clicked based on this ID value.
   This `ID` is a macro-defined integer value. After the UI file is compiled, each control will automatically generate the corresponding macro ID. (For more information about the macro, please refer to its [naming rules](name_rule.md#id_macro_rule))，  
   The macro ID of each option can be found in the corresponding `Activity.h` header file. E.g  
   
   ![](assets/radiogroup/id.png)  
   
   Then in the correlation function, the clicked item can be judged.
    ```c++
    static void onCheckedChanged_RadioGroup1(ZKRadioGroup* pRadioGroup, int checkedID) {
      LOGD("ID of selected item = %d", checkedID);
      switch (checkedID) {
        case ID_MAIN_RadioButton1:
          LOGD("The first item is selected");
          break;
        case ID_MAIN_RadioButton2:
          LOGD("The second item is selected");
          break;
        case ID_MAIN_RadioButton3:
          LOGD("The third item is selected");
          break;
        default:
          break;
      }
    }
    ```
 
7. Download and debug, check the effect.
 

## Sample code

Please refer to the RadioGroupDemo project in [Sample Code](demo_download.md#demo_download)  
Sample preview effect diagram:

![效果图](assets/radiogroup/example.png)
