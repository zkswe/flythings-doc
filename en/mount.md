# TF card plug-in monitor
By registering the monitoring interface, we can know the status of the TF card; here we first need to implement our own monitoring class:

```c++
#include "os/MountMonitor.h"

class MyMountListener : public MountMonitor::IMountListener {
public:
	virtual void notify(int what, int status, const char *msg) {
		switch (status) {
		case MountMonitor::E_MOUNT_STATUS_MOUNTED:	// Insert
			// msg is the mount path
			LOGD("mount path: %s\n", msg);
			mMountTextviewPtr->setText("TF card has been inserted");
			break;

		case MountMonitor::E_MOUNT_STATUS_REMOVE:	 // Remove
			// msg is the uninstall path
			LOGD("remove path: %s\n", msg);
			mMountTextviewPtr->setText("TF card has been removed");
			break;
		}
	}
};
```
Define the listening object:
```c++
static MyMountListener sMyMountListener;
```
Register to listen:
```c++
MOUNTMONITOR->addMountListener(&sMyMountListener);
```
When we no longer need to monitor, we need to remove the monitor:
```c++
MOUNTMONITOR->removeMountListener(&sMyMountListener);
```
For specific operations, please refer to the MountDemo project in [Sample Code](demo_download.md#demo_download)
