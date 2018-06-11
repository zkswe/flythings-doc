# 启动热点设置界面
~~~
EASYUICONTEXT->openActivity("SoftApSettingActivity");
~~~
# 热点操作接口说明
获取SoftApManager对象
~~~
#include "net/NetManager.h"
SoftApManager *pSAM = NETMANAGER->getSoftApManager();

// 可以定义个宏，方便以下接口调用
#define SOFTAPMANAGER     NETMANAGER->getSoftApManager()
~~~
开关热点
~~~
SOFTAPMANAGER->setEnable(true);
~~~
热点是否是打开状态
~~~
SOFTAPMANAGER->isEnable();
~~~
获取当前热点状态
~~~
SOFTAPMANAGER->getSoftApState();

// 有以下几种状态
E_SOFTAP_DISABLED	// 关闭状态
E_SOFTAP_ENABLING	// 打开过程中
E_SOFTAP_ENABLED	// 打开成功
E_SOFTAP_DISABLING // 关闭过程中
E_SOFTAP_ENABLE_ERROR	// 打开失败
~~~
修改热点名称、密码
~~~
SOFTAPMANAGER->setSsidAndPwd("zkswe", "abcd1234");
~~~
获取热点名称、密码
~~~
SOFTAPMANAGER->getSsid();
SOFTAPMANAGER->getPwd();
~~~
注册、反注册热点状态监听
~~~
void addSoftApStateListener(ISoftApStateListener *pListener);
void removeSoftApStateListener(ISoftApStateListener *pListener);
~~~