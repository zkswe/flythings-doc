# Device unique ID code

## How to read
* Required header files
 ```c++
 #include "security/SecurityManager.h"
 ```
* Read device ID
    ```c++
    // device id is 8 bytes
    unsigned char devID[8];
    // Returns true on success, false on failure
    bool ret = SECURITYMANAGER->getDevID(devID);
    ```