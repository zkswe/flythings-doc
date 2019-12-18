
## 数据存储

在某些应用场景中需要永久存储一些信息，如存储用户名称、密码或其他配置的一些信息，像这种数据内容比较少的情况，使用数据库去存储，操作起来会很繁琐，这里我们提供了一套简单的数据存储接口，以键-值对的方式存储，接口见storage/StoragePreferences.h：

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
>  2. 该分区大小有限制，屏的型号不同，大小也不同。尽量将数据大小控制在**512KB**以内。

### 使用示例  
 
  ```c++
    // 点击Button1存储用户名，"username":"zkswe"
    static bool onButtonClick_Button1(ZKButton *pButton) {
        // 存储用户名
        StoragePreferences::putString("username", "zkswe");
        return false;
    }

    // 点击Button2获取用户名
    static bool onButtonClick_Button2(ZKButton *pButton) {
        // 获取用户名
        std::string username = StoragePreferences::getString("username", "null");
        LOGD("username %s\n", username.c_str());
        return false;
    }

    // 点击Button3删除用户名
    static bool onButtonClick_Button3(ZKButton *pButton) {
        // 删除用户名
        StoragePreferences::remove("username");
        return false;
    }
  ```
