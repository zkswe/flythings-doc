# Mutex/lock
When threads are introduced into our program, in some cases other problems will arise, leading to program bugs.  

In multi-threaded programming, this situation is very common: A thread assigns a value to a variable, and then B thread reads the value.  
For the convenience of explanation, we translate this situation into the following code.  
Define a `struct Student` global variable, and define two threads, the A thread is responsible for assigning values to the `student` variable; 
The B thread makes a copy of the `student` variable, reads out the various members of the variable, and displays it on the log.  
**Excuse me: If two threads are started at the same time, what will be the result of the log of thread B?**
```c++
#include <system/Thread.h>

struct Student {
  char name[24]; //name
  int age;       //age
  int number;    //student ID
};

struct Student student = {0};

class AThread: public Thread {
public:
  virtual bool threadLoop() {
    snprintf(student.name, sizeof(student.name), "xiaoming");
    student.age = 10;
    student.number = 20200101;
    return true;
  }
};

class BThread: public Thread {
public:
  virtual bool threadLoop() {
    struct Student s = student;
    LOGD("name：%s", s.name);
    LOGD("age：%d", s.age);
    LOGD("student ID：%d", s.number);
    return true;
  }
};

static AThread athread;
static BThread bthread;
```

First of all, the result we want is the output in the log
```
name：xiaoming
age：10
student ID：20200101
```
In fact, if the number of tests is large enough, most of the output may be the same as we expect, and the following results may be output: 
```
name：
age：0
student ID：0
```
```
name：xiaoming
age：0
student ID：0
```
```
name：xiaoming
age：10
student ID：0
```

If there is an "abnormal" result in the program, it must be regarded as a bug. 
## Analyze the reasons    
  When there are multiple threads in the program, the thread execution order is flexibly scheduled by the system. It may happen that thread A executes a part of the instructions, then transfers to the B thread to execute some instructions, and then transfers to the A thread to execute the instructions.  
  For the above example, there are three statements in thread A to complete the complete assignment of the `student` variable. When only the first statement is executed, only the assignment of `name` is completed, and the system switches to B thread,  
  Then in the B thread, reading the `student` variable at this time, it will appear that the `name` field is valid, and the `age` and `number` are 0.
   Other abnormal results are the same. 

## How to solve   
  From the reason, as long as we ensure that all assignment operations of `student` in thread A are completed, thread B reads the `student` variable again, so there is no problem.  

## How to achieve 
  In programming, there is a **mutual exclusion lock** concept to ensure the integrity of shared data operations. Each object corresponds to a tag that can be called a "mutual exclusion lock". This tag is used to ensure that at any one time, only one thread can access the object.  
   If you are familiar with Linux programming, you can use standard implementation. Here we introduce the use of our encapsulated mutex class.  
  
  1. Define a mutex 
    ```c++
    static Mutex mutex1;
    ```
  2. Where locking is needed, define a local `Mutex::Autolock` class instance to lock.  
    This class utilizes the life cycle of local variables and the structure and destructor of C++ classes to automatically implement locking and unlocking operations.
    ```c++
    Mutex::Autolock _l(mutex1);
    ```    
    
Combining the above A and B thread examples, the modified code is as follows: 
```c++
#include <system/Thread.h>

struct Student {
  char name[24]; //name
  int age;       //age
  int number;    //student ID
};

struct Student student = {0};
//Define mutex
static Mutex mutext1;

class AThread: public Thread {
public:
  virtual bool threadLoop() {
    //Lock the statement of the function, and automatically unlock after the function ends
    Mutex::Autolock _lock(mutext1);
    snprintf(student.name, sizeof(student.name), "xiaoming");
    student.age = 10;
    student.number = 20200101;
    return true;
  }
};

class BThread: public Thread {
public:
  virtual bool threadLoop() {
    //Lock the statement of the function, and automatically unlock after the function ends
    Mutex::Autolock _lock(mutext1);
    struct Student s = student;
    LOGD("name：%s", s.name);
    LOGD("age：%d", s.age);
    LOGD("student ID：%d", s.number);
    return true;
  }
};

static AThread athread;
static BThread bthread;
```
In the code, we lock the operations related to `student` in threads A and B.    
When the A thread is executed, the `Mutex::Autolock _lock(mutext1);` statement will obtain the `mutex1` mutex. When the A thread is not unlocked, it turns to execute the B thread,  
Executed to the `Mutex::Autolock _lock(mutext1);` statement in the B thread, it also wants to obtain the `mutext1` mutex, but this mutex has been obtained by the A thread first, and now the B thread wants to obtain it , Can only wait, wait until A thread releases `mutext1`, B thread can obtain the `mutext1` mutex normally, and then continue to execute the next statement.  
After using the mutex, the locked code part can be executed mutually and the integrity is guaranteed.    

In our project, there is also an example of using mutex, see the source code `jni/uart/ProtocolParser.cpp` ：
```c++
void registerProtocolDataUpdateListener(OnProtocolDataUpdateFun pListener) {
	Mutex::Autolock _l(sLock);
	LOGD("registerProtocolDataUpdateListener\n");
	if (pListener != NULL) {
		sProtocolDataUpdateListenerList.push_back(pListener);
	}
}
```

If you don’t understand the concept of mutex enough, you can get more information about  **mutexes** from the Internet.
  