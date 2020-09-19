
# Sliding window
The sliding window control is similar to the interface effect of sliding left and right on the main interface of the mobile phone. Consists of a sliding main window and multiple icons.
## How to use
1. First create a **sliding main window** control in the UI file, and then add multiple **sliding window icon** controls to the main window control. 

   ![创建滑动窗口](assets/slidewindow/add_slidewindow.gif)

2.  When adding a **sliding window icon** control, it will automatically arrange the icons in order. If you add a full page, continue adding it will automatically turn the page. All the added icon controls can be found in **Outline View**.     

    ![](assets/slidewindow/outline.png)  
    
    If you want to adjust the position of the **sliding window icons**, you can select the node in the outline view, and then directly adjust it by dragging. Note the operation of the outline view in the lower left corner of the animation below.   
    
    ![](assets/slidewindow/outline2.gif)

3. In the **outline view**, select the **sliding window icon** control, you can add pictures and modify text separately; select the entire **sliding main window** to adjust the number of rows and columns, and you can also adjust it uniformly Font size, icon size.  

    ![添加icon](assets/slidewindow/add_icon.gif)  
  
  
## Code manipulation 
1. If you add a sliding window control, then after compilation, the associated function will be automatically generated. Refer to the function description [Sliding window correlation function](relation_function.md#slidewindow)

2. In general, we only need to scroll up and down by touching and sliding. However, we also provide the corresponding page turning function.
  * Switch to the next page
    ```c++
    // Switch to the next page with animation
    mSlideWindow1Ptr->turnToNextPage(true);
    // Switch to the next page, no animation
    mSlideWindow1Ptr->turnToNextPage(false);
    ```
  * Switch to the previous page
    ```c++
    // Switch to the previous page with animation
    mSlideWindow1Ptr->turnToPrevPage(true);
    // Switch to the previous page, no animation
    mSlideWindow1Ptr->turnToPrevPage(false);
    ```
3. We can also monitor which page the sliding window has turned to through the code:  
  ```c++
    namespace { /* Add an anonymous scope to prevent multiple source files from defining the same class name and conflict at 
    runtime*/
    // Implement your own listening interface
    class MySlidePageChangeListener : public ZKSlideWindow::ISlidePageChangeListener {
    public:
        virtual void onSlidePageChange(ZKSlideWindow *pSlideWindow, int page) {
            LOGD("Now switch to page %d", page);
        }
    };
    }
    // Define the listening object
    static MySlidePageChangeListener sMySlidePageChangeListener;

    static void onUI_init() {
        mSlidewindow1Ptr->setSlidePageChangeListener(&sMySlidePageChangeListener);
    }
  ```

4. Get the current page
  ```c++
  int i = mSlideWindow1Ptr->getCurrentPage();
  LOGD("Current page %d", i);
  ```

# Sample code
Effect picture    

 ![](assets/slidewindow/preview.png)  

For the specific use of sliding window controls, please refer to the SlideWindowDemo project in [Sample Code](demo_download.md#demo_download)