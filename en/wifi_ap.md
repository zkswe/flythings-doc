# Launch hotspot setting interface
```c++
EASYUICONTEXT->openActivity("SoftApSettingActivity");
```
# Hotspot operation interface description
Get the SoftApManager object
```c++
#include "net/NetManager.h"
SoftApManager *pSAM = NETMANAGER->getSoftApManager();

// You can define a macro to facilitate the following interface calls
#define SOFTAPMANAGER     NETMANAGER->getSoftApManager()
```
Switch hotspot
```c++
SOFTAPMANAGER->setEnable(true);
```
Whether the hotspot is open
```c++
SOFTAPMANAGER->isEnable();
```
Get current hotspot status
```c++
SOFTAPMANAGER->getSoftApState();

// There are several states
E_SOFTAP_DISABLED	// Disabled
E_SOFTAP_ENABLING	// During opening
E_SOFTAP_ENABLED	// Open successfully
E_SOFTAP_DISABLING // During closing
E_SOFTAP_ENABLE_ERROR	// failed to open
```
Modify hotspot name and password
```c++
SOFTAPMANAGER->setSsidAndPwd("zkswe", "abcd1234");
```
Get hotspot name and password
```c++
SOFTAPMANAGER->getSsid();
SOFTAPMANAGER->getPwd();
```
Registration and anti-registration hotspot status monitoring
```c++
void addSoftApStateListener(ISoftApStateListener *pListener);
void removeSoftApStateListener(ISoftApStateListener *pListener);
```