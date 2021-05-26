# 设备唯一ID码

## 如何读取
* 所需头文件
 ```c++
 #include "security/SecurityManager.h"
 ```
* 读取设备ID
   * Z6、Z11、A33平台接口使用说明：
    ```c++
    // 设备 id 共8个字节
    unsigned char devID[8];
    // 成功返回 true，失败返回 false
    bool ret = SECURITYMANAGER->getDevID(devID);
    ```
   * H500S、Z20、Z21平台接口使用说明：
    ```c++
    // 设备 id 最多16个字节
    unsigned char devID[16];
    // 返回 devID长度
    int ret = SECURITYMANAGER->getDevID(devID);
    ```