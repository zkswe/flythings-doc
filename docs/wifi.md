---
layout: default
---
# 启动wifi设置界面
~~~
EASYUICONTEXT->openActivity("WifiSettingActivity");
~~~

# wifi操作接口说明
获取WifiManager对象
~~~
#include "net/NetManager.h"
WifiManager *pWM = NETMANAGER->getWifiManager();

//	可以定义个宏,方便以下接口调用
#define  WIFIMANAGER    NETMANAGER->getWifiManager()
~~~
检测机器是否支持wifi
~~~
WIFIMANAGER->isSupported();
~~~
检测wifi是否打开
~~~
WIFIMANAGER->isWifiEnable();
~~~
开关wifi
~~~
WIFIMANAGER->enableWifi(true);
~~~
扫描wifi
~~~
WIFIMANAGER->startScan();
~~~
连接wifi
~~~
WIFIMANAGER->connect(ssid， pw);
~~~
断开wifi连接
~~~
WIFIMANAGER->disconnect();
~~~
检测wifi是否已连接
~~~
WIFIMANAGER->isConnected();
~~~
获取已连接wifi的信息
~~~
WIFIMANAGER->getConnectionInfo();
~~~
注册、反注册wifi信息监听
~~~
void addWifiListener(IWifiListener *pListener);
void removeWifiListener(IWifiListener *pListener);
~~~
