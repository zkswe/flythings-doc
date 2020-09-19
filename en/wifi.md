## Start the wifi setting interface
```c++
EASYUICONTEXT->openActivity("WifiSettingActivity");
```

## Description of wifi operation interface
Get WifiManager object
```c++
#include "net/NetManager.h"
WifiManager *pWM = NETMANAGER->getWifiManager();

// You can define a macro to facilitate the following interface calls
#define  WIFIMANAGER    NETMANAGER->getWifiManager()
```
Check whether the machine supports wifi
```c++
WIFIMANAGER->isSupported();
```
Check if wifi is on
```c++
WIFIMANAGER->isWifiEnable();
```
Switch wifi
```c++
WIFIMANAGER->enableWifi(true);
```
Scan wifi
```c++
WIFIMANAGER->startScan();
```
Connect to wifi
```c++
WIFIMANAGER->connect(ssid, pw);
```
Disconnect wifi connection
```c++
WIFIMANAGER->disconnect();
```
Check if wifi is connected
```c++
WIFIMANAGER->isConnected();
```
Get connected wifi information
```c++
WIFIMANAGER->getConnectionInfo();
```
Registration and anti-registration wifi information monitoring
```c++
void addWifiListener(IWifiListener *pListener);
void removeWifiListener(IWifiListener *pListener);
```
## Sample code  
See the `NetDemo` project in the [sample code](demo_download.md#demo_download) 