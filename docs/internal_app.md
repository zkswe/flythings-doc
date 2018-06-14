---
layout: default
---
除了开发人员自己定制的界面外，我们系统也内置了几个常用的界面，如插卡升级时出现的界面就属于内置界面之一；
![](images/1065724717.jpg)

另外，还有系统设置界面，打开方式：
```c++
EASYUICONTEXT->openActivity("ZKSettingActivity");
```
![](images/1050526325.jpg)

其中每一项点击进去后又是新的内置界面，打开网络设置：
```c++
EASYUICONTEXT->openActivity("NetSettingActivity");
```
![](images/265806765.jpg)

打开WIFI设置：
```c++
EASYUICONTEXT->openActivity("WifiSettingActivity");
```
![](images/937353833.jpg)

如果目标机器支持wifi，打开右上角开关，界面上会显示搜索到的wifi信息；
打开热点设置界面：
```c++
EASYUICONTEXT->openActivity("SoftApSettingActivity");
```
![](images/1125946876.jpg)

回到刚刚的系统设置界面，我们再点击打开语言设置界面：
```c++
EASYUICONTEXT->openActivity("LanguageSettingActivity");
```
![](images/676072475.jpg)

开发者选项界面：
```c++
EASYUICONTEXT->openActivity("DeveloperSettingActivity");
```
![](images/135395757.jpg)

目前只有ADB的调试开关选项。