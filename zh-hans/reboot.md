# 重启系统
如果我们需要机器主动重启，下面给大家介绍下如何实现。
* 需要的头文件
```c++
	#include<unistd.h>
	#include<sys/reboot.h>
```
* 代码实现
```c++
	//同步数据，将缓存数据保存，以防数据丢失
	sync();
	reboot(RB_AUTOBOOT);
```