
## Data storage

In some application scenarios, it is necessary to permanently store some information (save data after power-off), such as account numbers, passwords or other configuration information. The characteristics of these data are: the total amount is small, but it needs flexible access. In such cases, there is no need to use a database. We provide a set of simple data storage interfaces, which are stored in the form of **key-value pairs**.

* Required header files 
  ```c++
    #include "storage/StoragePreferences.h"
  ```

* Main interface

  ```c++
    // Storage interface
    static bool putString(const std::string &key, const std::string &val);
    static bool putInt(const std::string &key, int val);
    static bool putBool(const std::string &key, bool val);
    static bool putFloat(const std::string &key, float val);

    // delete the specified key
    static bool remove(const std::string &key);
    // Clear storage data
    static bool clear();

    // Get the interface, if the corresponding key value is not obtained, return the default value of defVal
    static std::string getString(const std::string &key, const std::string &defVal);
    static int getInt(const std::string &key, int defVal);
    static bool getBool(const std::string &key, bool defVal);
    static float getFloat(const std::string &key, float defVal);
  ```

> [!Warning]
>  1. This interface saves the data in the flash as a file, so **do not write frequently to cause damage to the flash.**  
>  2. The size of the partition is limited. The size of the partition varies depending on the model of the screen. Try to keep the data size within **512KB**.


### Usage example
 * Save
  ```c++
  //Save the string, use "username" as the alias, and the value is the name string
  const char* name = "zhang san";
  StoragePreferences::putString("username", name);
  ```
  
  ```
  //Save the boolean variable, use "power" as the alias, the value is true
  StoragePreferences::putBool("power", true);
  ```
  ```
  //Save the floating point number, using "temperature" as the alias, the value is 30.12
  StoragePreferences::putFloat("temperature", 30.12);
  ```
  ```
  //Save the integer, use "age" as the alias, the value is 20
  StoragePreferences::putInt("age", 20);
  ```
  
 * Read
   ```c++
   //Read the value of the "username" key, if there is no value, return an empty string
   std::string name = StoragePreferences::getString("username", "");
   //Log print the string read
   LOGD("username %s\n", username.c_str());
   ```
   ```
  //Read Boolean variable, if there is no value, then specify to return false
  bool power = StoragePreferences::getBool("power", false);
  ```
  ```
  //Read floating point number, if there is no value, specify to return 0
  float temperature = StoragePreferences::getFloat("temperature", 0);
  ```
  ```
  //Read the integer, if there is no value, return 18
  int age = StoragePreferences::getInt("age", 18);
  ```
   
* Delete
  ```
  //Clear a value individually
  StoragePreferences::remove("username");
  StoragePreferences::remove("power");
  StoragePreferences::remove("temperature");
  StoragePreferences::remove("age");
  //Clear all values
  StoragePreferences::clear();
  ```  
* Modify
  If you need to modify a value, just save the key value repeatedly, and the old value will be automatically overwritten