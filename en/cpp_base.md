# c++ basic knowledge
This chapter is mainly for students who do not have C++ foundation, mainly to explain the common C++ grammar and common classes in our system;

## Class
When it comes to C++, you have to mention the **Class** first. Don't think about it too complicated. Just think of it as a structure in the C language. For example:

```c++
// C
struct Position {
	int left;
	int top;
	int width;
	int height;
};

// c++
class Position {
public:
	int left;
	int top;
	int width;
	int height;
};
```
Define variables:

```c++
// C
struct Position pos;

// c++
Position pos;
```
Operating variables:

```c++
// C is the same as c++
pos.left = 0;
```
**Class** Chas more concepts of inheritance, polymorphism, overloading and access permissions than the structure in C language. For students who are only familiar with C language, they don’t need to pay too much attention to these details, as long as they master how to use it;<br/>
In addition, functions can be directly defined in **Class**. The structure in C language is to define function pointers. This is a bit different. After **Class** defines the function, it can be used like operating variables. Here Give an example commonly used in our framework:

```c++
// Set the text content, where mTextView1Ptr is a pointer variable of type ZKTextView
mTextView1Ptr->setText("Hello");
```

## Commonly used classes
### string class
The string class actually encapsulates the string and provides a lot of functions. Students who are only familiar with the C language only need to know one function: `c_str()`, this function will return the characters in the string class String data, here is also an example commonly used in our framework:

```c++
// Input box callback interface
static void onEditTextChanged_Edittext1(const std::string &text) {
	// The return value type of c_str() function: const char *
	const char *pStr = text.c_str();
	
	// Then you can operate like ordinary strings, such as getting the strlen(pStr), etc.
	
}
```
Give another example of obtaining the content of a text control:

```c++
// std is the namespace, std::string means to use the string class under std, don’t worry too much
// When encountering the string class, we can refer to the following definition
std::string text = mTextView1Ptr->getText();

// The subsequent operations are the same
const char *pStr = text.c_str();
```


## <span id="snprintf">Formatted output function snprintf</span>  
### Function prototype:
  ```c++
  int snprintf(char* dest_str,size_t size,const char* format,...);
  ```  
### Features:    
  The variable parameters (...) are formatted into a string according to format, and then copied to str.
  
  (1) If the length of the formatted string is < sizecopy all the string to str and add a string terminator('\0')after it；  
  (2) If the length of the formatted string >= size, only (size-1) characters in it will be copied to str, and a string terminator('\0')will be added after it, and return The value is the length of the string to be written.
### Required header files:
  ```
  #include <stdio.h>
  ```

### Formatting parameters    
* Specifier  
  `%d` decimal signed integer  
  `%u` decimal unsigned integer  
  `%f` floating point number  
  `%s` string 
  `%c` single character  
  `%p` pointer value  
  `%e` exponential floating point number  
  `%x`, %X unsigned integer in hexadecimal  
  `%o` Unsigned integer in octal  
  `%g` outputs the output value according to the smaller output length in %e or %f type  
  `%p` output address character  
  `%lu` 32-bit unsigned integer  
  `%llu` 64-bit unsigned integer   
    
* Description  
    (1).A number can be inserted between “%” and a letter to indicate the maximum field width.  
    For example: %3d means to output a 3-digit integer, which is not enough to be right-justified.  
    %9.2f represents a floating-point number with a field width of 9, where the decimal place is 2 and the integer place is 6,  
    The decimal point occupies one digit, which is not enough for 9 digits to be right aligned.  
    %8s means output a string of 8 characters, which is not enough to right-justify 8 characters.  
    If the length of the string or the number of integers exceeds the specified field width, it will be output according to its actual length.  
    But for floating-point numbers, if the number of integers exceeds the specified width of integers, it will be output as actual integers;  
    If the number of decimal places exceeds the specified width of decimal places, the output will be rounded according to the specified width.  
    In addition, if you want to add some zeros before the output value, you should add a zero before the field width term.  
    For example: %04d means that when outputting a value less than 4 digits, 0 will be added to the front to make the total width 4 digits.
    If a floating point number is used to represent the output format of characters or integers, the number after the decimal point represents the maximum width, and the number before the decimal point represents the minimum width.  
    For example: %6.9s means to display a string with a length not less than 6 and not greater than 9. If it is greater than 9, the content after the 9th character will be deleted.  
    (2). You can add a lowercase letter l between "%" and the letter, indicating that the output is a long number.  
    For example: %ld means output long integer  
    %lf means output double floating point number  
    (3). You can control the output to be left-aligned or right-aligned, that is, add a "-" sign between "%" and the letter, Explain that the output is left-justified, otherwise it is right-justified.  
    For example: %-7d means that the output 7-bit integer is left-justified  
    %-10s means output 10 characters left-justified   

* Special specifier  
  `\n` newline                                                                                    
  `\f` Clear screen and change page   
  `\r` Enter  
  `\t` Tab character 

### Examples
  * Direct output integer
  ```c++
  char buf[64] = {0};
  snprintf(buf, sizeof(buf), "%d", 314);
  LOGD("%s", buf);//log output buf
  ```  
  The log output is
  ```
  314
  ```
  
  * Control the number of integers
  ```c++
  char buf[64] = {0};
  snprintf(buf, sizeof(buf), "%05d", 314); //Format to 5 digits, less than 5 digits, add 0 in front
  LOGD("%s", buf);//Log output buf string
  ```  
  The log output is
  ```
  00314
  ```
  * Directly output floating point numbers
  ```c++
  char buf[64] = {0};
  snprintf(buf, sizeof(buf), "%f", 3.14); 
  LOGD("%s", buf);//Log output buf string
  ```  
  The log output is
  ```
  3.140000
  ```
  
  * Control output floating point number format
  ```c++
  char buf[64] = {0};
  //Output decimals, a total of 6 characters width (including the decimal point), 3 decimal places, two integer digits, and 0 if the integer is less than two digits
  snprintf(buf, sizeof(buf), "%06.3f", 3.14);
  LOGD("%s", buf);//Log output buf string
  ```  
  The log output is
  ```
  03.140
  ```
