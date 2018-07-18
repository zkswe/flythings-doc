---
show_title: false
permalink: /docs/zh/mount
key: docs-mount-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---
# SD卡拔插监听
通过注册监听接口，我们可以知道SD卡的拔插状态；这里我们首先需要实现自己的监听类：

```c++
#include "os/MountMonitor.h"

class MyMountListener : public MountMonitor::IMountListener {
public:
	virtual void notify(int what, int status, const char *msg) {
		switch (status) {
		case MountMonitor::E_MOUNT_STATUS_MOUNTED:	// 插入
			// msg 为挂载路径
			LOGD("mount path: %s\n", msg);
			mMountTextviewPtr->setText("SD卡已插入");
			break;

		case MountMonitor::E_MOUNT_STATUS_REMOVE:	// 移除
			// msg 为卸载路径
			LOGD("remove path: %s\n", msg);
			mMountTextviewPtr->setText("SD卡已移除");
			break;
		}
	}
};
```
定义监听对象：
```c++
static MyMountListener sMyMountListener;
```
注册监听：
```c++
MOUNTMONITOR->addMountListener(&sMyMountListener);
```
当我们不再需要监听时，需要移除监听：
```c++
MOUNTMONITOR->removeMountListener(&sMyMountListener);
```
[样例代码](https://github.com/zkswe/Z11SDemoCode/tree/master/MountDemo)
