
## 数据存储

在某些应用场景中需要永久存储一些信息，如存储用户名称、密码或其他配置的一些信息，像这种数据内容比较少的情况，使用数据库去存储，操作起来会很繁琐，这里我们提供了一套简单的数据存储接口，以**键-值对**的方式存储，接口见storage/StoragePreferences.h：

* 所需头文件 
  ```c++
    #include "storage/StoragePreferences.h"
  ```

* 主要接口 

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

> [!Warning]
>  1. 该接口是将数据以文件的形式保存在flash中， 所以**请勿频繁写入，造成flash损坏。**
>  2. 该分区大小有限制，屏的型号不同，分区大小也不同。尽量将数据大小控制在**512KB**以内。

### 使用示例  
 * 保存
  ```c++
  //保存字符串
  const char* name = "zhang san";
  StoragePreferences::putString("username", name);
  ```
  
  ```
  //保存布尔变量
  StoragePreferences::putBool("power", true);
  ```
  ```
  //保存浮点数
  StoragePreferences::putFloat("temperature", 30.12);
  ```
  ```
  //保存整型
  StoragePreferences::putInt("age", 20);
  ```
  
 * 读取
   ```c++
   //读取“username”这个键的值，如果没有值，返回空字符串
   std::string name = StoragePreferences::getString("username", "");
   //日志打印读取到的字符串
   LOGD("username %s\n", username.c_str());
   ```
   ```
  //读取布尔变量
  bool power = StoragePreferences::getBool("power", false);
  ```
  ```
  //读取浮点数
  float temperature = StoragePreferences::getFloat("temperature", 0);
  ```
  ```
  //读取整型
  int age = StoragePreferences::getInt("age", 0);
  ```
   
* 删除
  ```
  //单独清空某一个值
  StoragePreferences::remove("username");
  StoragePreferences::remove("power");
  StoragePreferences::remove("temperature");
  StoragePreferences::remove("age");
  //清空所有值
  StoragePreferences::clear();
  ```  
* 修改  
  如果需要修改某个值，只需要按键值重复保存即可，将自动覆盖旧的值