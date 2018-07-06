---
layout: default
---
# 线程封装
标准的线程操作接口使用起来特别繁琐，而且也很容易出现问题；为此，我们框架对其进行了一些封装，见 `jni/include/system` 目录下头文件：
* Thread.h：线程类
* Mutex.h：锁类
* Condition.h：条件变量类

## 线程
现在创建线程变得非常简单，只要继承`Thread`，在`threadLoop()`函数中添加自己的逻辑代码就可以了，另外还有一函数`readyToRun()`线程创建完后会调一次，可以在该函数中做一些初始化的操作；

```c++
#include "system/Thread.h"

class TestThread : public Thread {
protected:
	virtual bool readyToRun() {
		// init something
		
		// return false 将退出线程
		return true;
	}
	
	virtual bool threadLoop() {
		// do something
		
		// return false 将退出线程
		return true;
	}
};

static TestThread sTestThread;
```
启动线程：
```C++
sTestThread.run();
```
完整流程如下：

![](images/threadloop.png)

除了以上两个函数返回 **false** 来退出线程外，还可以调用 `requestExit()` 或 `requestExitAndWait()` 请求退出线程，其中 `requestExit()` 调用完函数立即返回，并不代表线程也退出了，`requestExitAndWait()` 会等待线程退出才返回；调用 `requestExit()` 或 `requestExitAndWait()` 后 `Thread::exitPending()`将返回 **true** ，在`threadLoop()`可以通过检测`exitPending()`判断是否需要退出线程；

## 锁
至于锁，使用起来就更简单了，定义好`Mutex`变量，使用如下代码就可以对相应的代码段加锁了：
```C++
static Mutex sLock;
Mutex::Autolock _l(sLock);
```
举一个我们项目里面用到的例子，见 `jni/uart/ProtocolParser.cpp` ：
```C++
void registerProtocolDataUpdateListener(OnProtocolDataUpdateFun pListener) {
	Mutex::Autolock _l(sLock);
	LOGD("registerProtocolDataUpdateListener\n");
	if (pListener != NULL) {
		sProtocolDataUpdateListenerList.push_back(pListener);
	}
}
```
这样锁的作用域就是`registerProtocolDataUpdateListener`整个函数，函数返回后，自动解锁；其实以上锁的作用域就是变量 `_l` 的生命周期区间；<br/>

对于线程完整的使用样例，可以参考项目下 `jni/uart/` 目录下源码，里面的 `UartContext` 里使用`Thread`类开启了一线程来读串口数据，`ProtocolParser.cpp` 里使用`Mutex`锁对数据监听接口进行加锁；