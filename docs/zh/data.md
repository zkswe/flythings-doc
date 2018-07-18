---
show_title: false
permalink: /docs/zh/data
key: docs-data-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---
本框架提供了一套简单的数据存储接口，以键-值对的方式存储，接口见storage/StoragePreferences.h：
```c++
// 存储接口
static bool putString(const std::string &key, const std::string &val);
static bool putInt(const std::string &key, int val);
static bool putBool(const std::string &key, bool val);
static bool putFloat(const std::string &key, float val);

// 删除指定键
static bool remove(const std::string &key);
// 清空存储数据
static bool clear();

// 获取接口，获取不到对应键值，返回defVal默认值
static std::string getString(const std::string &key, const std::string &defVal);
static int getInt(const std::string &key, int defVal);
static bool getBool(const std::string &key, bool defVal);
static float getFloat(const std::string &key, float defVal);
```
调用事例：
```c++
// 设置键值
StoragePreferences::putString("key", "val");

// 获取"key"对应的值
std::string val = StoragePreferences::getString("key", "defVal");
```