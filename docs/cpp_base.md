---
layout: default
---
# C++基础知识
这一章节我们主要针对没有C++基础的同学开设的，主要讲解一下我们系统中常用C++语法及常用类；

## 类
提到C++就不得不先提一下 **类**，也不要想得太复杂，把它当C语言中的结构体来理解就可以了，举个例子：
```C++
// C
struct Position {
	int left;
	int top;
	int width;
	int height;
};

// C++
class Position {
public:
	int left;
	int top;
	int width;
	int height;
};
```
定义变量：
```C++
// C
struct Position pos;

// C++
Position pos;
```
操作变量：
```C++
// C和C++一样
pos.left = 0;
```
**类**比C语言中的结构体多了继承、多态、重载还有访问权限的一些概念，对于只熟悉C语言的同学可以不用过多的关注这些细节，只要掌握如何使用即可；<br/>
另外，**类**里可以直接定义函数，C语言中的结构体是定义函数指针，这一点有点不一样，**类**定义完函数后，就可以跟操作变量一样使用了，这里举一个在我们框架中常用的例子：
```C++
// 设置文本内容，其中 mTextview1Ptr为ZKTextView类型的指针变量
mTextview1Ptr->setText("Hello");
```

## 常用类
### string类
string类其实就是对字符串进行了一些封装，并提供了一大堆函数，只熟悉C语言的同学只需要知道一个函数就可以了：`c_str()`，该函数会返回string类中的字符串数据，这里也举一个在我们框架中常用的例子：
```C++
// 输入框回调接口
static void onEditTextChanged_Edittext1(const std::string &text) {
	// c_str()函数的返回值类型：const char *
	const char *pStr = text.c_str();
	
	// 之后就可以像普通的字符串操作了，如获取字符串长度strlen(pStr) 等等
	...
}
```
再举一个获取文本控件内容的例子：
```C++
// std为命名空间，std::string表示使用std下的string类，不用过多的理会，碰到string类，我们参考下面定义就可以了
std::string text = mTextview1Ptr->getText();

// 之后的操作就都一样啦
const char *pStr = text.c_str();
```