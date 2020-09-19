# System time   
* Required header files

```c++
#include "utils/TimeHelper.h"
```
  > Explanation of each field of tm structure

```c++
struct tm {
    int tm_sec; /* Seconds-the value range is [0,59] */
	int tm_min; /* Minutes-the value range is [0,59] */
	int tm_hour; /* Hour-the value range is [0,23] */
	int tm_mday; /* The day of the month-the value range is [1,31] */
	int tm_mon; /* Month (starting from January, 0 means January)-the value range is [0,11] */
	int tm_year; /* Year, its value starts from 1900 */
    ...
}
```

* Get the current date

```c++
struct tm *t = TimeHelper::getDateTime();
```

* Display time code sample

```c++
static void updateUI_time() {
    char timeStr[20];
    static bool bflash = false;
    struct tm *t = TimeHelper::getDateTime();

    sprintf(timeStr, "%02d:%02d:%02d", t->tm_hour,t->tm_min,t->tm_sec);
    mTextTimePtr->setText(timeStr); // Pay attention to modify the control name

    sprintf(timeStr, "%d year %02d month %02d day", 1900 + t->tm_year, t->tm_mon + 1, t->tm_mday);
    mTextDatePtr->setText(timeStr); // Pay attention to modify the control name

    static const char *day[] = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
    sprintf(timeStr, "Week %s", day[t->tm_wday]);
    mTextWeekPtr->setText(timeStr); // Pay attention to modify the control name
}
```  



* Set time code sample

```c++
// Use tm structure to set time
static void setSystemTime() {
	struct tm t;
	t.tm_year = 2017 - 1900;  //Year
	t.tm_mon = 9 - 1;         //Month
	t.tm_mday = 13;           //Day
	t.tm_hour = 16;           //Hour
	t.tm_min = 0;             //Minute
	t.tm_sec = 0;             //second

	TimeHelper::setDateTime(&t);
}

// Or use a string to set the time date str format: 2017-09-13 16:00:00
TimeHelper::setDateTime("2017-09-13 16:00:00");
```

For the complete source code, see the **DateDemo** project in the [**sample code package**](demo_download.md#demo_download)
