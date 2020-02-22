# 远程升级
目前系统没有直接进行远程升级的接口。 但是我们可以了解TF卡检测升级的机制后，再添加上一些自己的代码，即可达到远程升级的目的。  
我们先介绍TF卡检测升级的流程。
## TF卡检测升级流程
当上电开机或者插入TF的时候，系统会检测是否有TF插入，如果TF卡正常挂载，那么继续检测**TF卡根目录**下是否存在 **update.img** 文件 (系统内，TF卡根目录映射为 `/mnt/extsd`)。  
如果存在，进一步校验文件是否符要求，如果通过校验，然后弹出提示升级界面，用户可以选择进行升级。  
如果不存在，结束检测流程，界面无任何动作。    

# 远程升级先不写



首先将升级文件`update.img`从远程服务器上下载到本地，下载完成后调用系统加测升级文件的接口，
若检测结果正常，系统会自动弹出升级界面，此时点击确定升级即可。
* 头文件
```c++
	#include "os/UpgradeMonitor.h"
```
* 检测升级文件接口
```c++
	/*pPath为下载的升级文件的存储路径*/
	bool checkUpgradeFile(const char *pPath);
```
## 样例参考
升级文件的下载一般放在单独的线程中去进行，本样例采用http方式从服务器下载升级文件。
* 具体代码
```c++
	class DownloadThread : public Thread {
	protected:
    virtual bool threadLoop(){
        http::HttpClient http;
        mTextview1Ptr->setText("下载升级文件");
        //创建升级文件的保存路径
        system("mkdir /mnt/extsd/temp");
		//这里修改为真实服务IP
        string err = http.Download("192.168.1.1/update.img", 80, "/mnt/extsd/temp/update.img");
        mTextview1Ptr->setText(err);
        if (err.empty()) {
            UpgradeMonitor::getInstance()->checkUpgradeFile("/mnt/extsd/temp");
        }
        mButton1Ptr->setInvalid(false);
        return false;
    };

};
```
## 代码移植
若要在自己的工程中加入远程升级的功能，需把样例代码中`jni`目录下`http`文件夹拷贝到自己的工程中，然后在使用的工程文件中添加头文件。
```c++
	#include "http/http_client.h"
```
然后按照样例参考中创建线程进行即可。
	
> [!Warning]
>  1. 下载升级文件时请确定存储区域是否足够存放升级文件，否则可能导致文件丢失。
>  2. 进行远程升级时，请确保机器的网络连接畅通，同时不要断电，否则可能导致升级失败。

具体细节请参考远程升级样例代码。