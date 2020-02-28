# TF卡

当插入TF卡后，系统会自动挂载为 `/mnt/extsd`目录，如果想读写TF卡内的文件，可以对该目录进行读写操作。  

## 判断是否挂载TF卡
```c++
#include "os/MountMonitor.h"
```
```c++
  if (MOUNTMONITOR->isMount()) {
    //TF卡已经挂载
  } else {
    //TF卡未挂载
  }
```


> [!Note]
> `/mnt/extsd` 目录一直存在，与是否插入TF卡无关  
> 没有插入TF卡的情况下，如果读写该目录，内容会保存在内存中，但断电就会消失。
