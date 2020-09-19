# camera
FlyThings provides camera controls.  

> [!Note]
>  Not all versions of the camera support the camera function! If you need to use this function normally, please purchase a version that supports the USB camera function. 

## How to use   
1. First, create a **camera** control, the default background color is black.
2. View the attribute table of **camera**   

   ![](assets/camera/properties.png)  

  Set Auto Preview to **On**  
  According to the connected camera model, select **CVBS** signal or not
3. Connect the camera to the screen, then download and run the program, you can see the camera preview screen.

## Start/stop preview
We can start/stop the preview screen through code control
* Start preview
```c++
mCameraView1Ptr->startPreview();
```
* Stop preview
```c++
mCameraView1Ptr->stopPreview();
```

## Camera to take pictures

1. Implement the camera callback interface
  ```c++
  class PictureCallback : public ZKCamera::IPictureCallback {
  public:
      virtual void onPictureTakenStarted() {
        mTextView1Ptr->setText("Start taking pictures");
      }
      virtual void onPictureTakenEnd() {
        mTextView1Ptr->setText("Picture is over");
      }
      virtual void onPictureTakenError() {
        mTextView1Ptr->setText("Picture error");
      }
      virtual const char* onPictureSavePath() {
          //Photo save path
          return "/mnt/extsd/camera.jpg";
      }
  };
  ```

2. Instantiate the interface and register
  ```c++
  //Defined as a global static variable
  static PictureCallback picture_callback;
  ```

3. Register the camera callback interface
  ```c++
  static void onUI_init(){
      mCameraView1Ptr->setPictureCallback(&picture_callback);
  }
  ```
  ```c++
  static void onUI_quit() {
    //Remember to empty the registration interface when the interface exits
      mCameraView1Ptr->setPictureCallback(NULL);
  }
  ```
4. Add a button, when you click the button, request a phot
  ```c++
  static bool onButtonClick_Button3(ZKButton *pButton) {
	  //Request a photo
	  mCameraView1Ptr->takePicture();
      return false;
  }
  ```

## Sample code
In this example, the camera preview and camera functions, and album functions are implemented.  
For specific implementation, refer to [Sample Code](demo_download.md#demo_download) CameraDemo project

![](assets/camera/preview.png) 