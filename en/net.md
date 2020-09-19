# socket network programming
If you are familiar with Linux socket programming, you can perform network programming according to the standard Linux socket programming interface.    

For some commonly used socket programming implementation operations, for example, to establish a TCP client, we have made a simple package based on the standard interface of Linux, which is convenient to use. If necessary, you can follow the steps to integrate the source code into your own project.

## Porting steps 
1. Create a new folder under the jni folder of the project and name it `net`  
    
  ![](assets/create_net_folder.png)
2. Download [net.h](https://docs.flythings.cn/src/net/net.h) 、[net.cpp](https://docs.flythings.cn/src/net/net.cpp)  Two files, save them to the `net` folder.

  ![](assets/net_class.png)  

## How to use 
### TCP client
* Introduce header files
  ```c++
  #include "net/net.h"
  ```
* Usage example 
  ```c++
  /*Use TCP protocol to connect to port 80 of the domain name www.baidu.com, and change the domain name to IP.*/
  net::Conn* conn = net::Dial("tcp", "www.baidu.com:80");
  //net::Conn* conn = net::Dial("tcp", "14.215.177.38:80");
  if (conn) {
    byte buf[2048] = {0};
    const char* req = "GET / HTTP/1.1\r\nConnection: close\r\n\r\n";
    //send
    conn->Write((byte*)req, strlen(req));
    while (true) {
      //Read, timeout 1000ms
      int n = conn->Read(buf, sizeof(buf) - 1, 1000);
      if (n > 0) {
        buf[n] = 0;
        LOGD("Read %d bytes: %s", n, buf);
      } else if (n == 0) {
        LOGD("Normal disconnection");
        break;
      } else if (n == net::E_TIMEOUT) {
        LOGD("Read timeout");
      } else {
        LOGD("Error");
        break;
      }
    }
    //Close the connection
    conn->Close();
    //Release memory
    delete conn;
    conn = NULL;
  ```

### UDP client
* Introduce header files 
  ```c++
  #include "net/net.h"
  ```
* Usage example
  ```c++
  //Use udp protocol to connect IP: 192.168.1.100 port 8080
  net::Conn* conn = net::Dial("udp", "192.168.1.100:8080");
  if (conn) {
    byte buf[2048] = {0};
    const char* req = "hello";
    conn->Write((byte*)req, strlen(req));
    while (true) {
      //Read, timeout 1000ms
      int n = conn->Read(buf, sizeof(buf) - 1, 1000);
      if (n > 0) {
        buf[n] = 0;
        LOGD("Read %d bytes: %s", n, buf);
      } else if (n == 0) {
        LOGD("Normal disconnection");
        break;
      } else if (n == net::E_TIMEOUT) {
        LOGD("Read timeout");
        //Set timeout here to exit
        break;
      } else {
        LOGD("Error");
        break;
      }
    }
    //Close the connection
    conn->Close();
    //Release memory
    delete conn;
    conn = NULL;
  }
  ```

