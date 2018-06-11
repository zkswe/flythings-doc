操作接口 jni/include/utils/TimeHelper.h
~~~
#include "utils/TimeHelper.h"

// 获取当前日期
struct tm *t = TimeHelper::getDateTime();

// 更新时间代码段
static void updateUI_time() {
	char timeStr[20];
	static bool bflash = false;
	struct tm *t = TimeHelper::getDateTime();

	sprintf(timeStr, "%02d:%02d:%02d", t->tm_hour,t->tm_min,t->tm_sec);
	mTextTimePtr->setText(timeStr); // 注意修改控件名称

	sprintf(timeStr, "%d年%02d月%02d日", 1900 + t->tm_year, t->tm_mon + 1, t->tm_mday);
	mTextDatePtr->setText(timeStr); // 注意修改控件名称
    
    static const char *day[] = { "日", "一", "二", "三", "四", "五", "六" };
	sprintf(timeStr, "星期%s", day[t->tm_wday]);
	mTextWeekPtr->setText(timeStr); // 注意修改控件名称
}

// 设置日期
TimeHelper::setDateTime(ptm);

// 或者设置日期字符串  date str format: 2017-09-13 16:00:00
TimeHelper::setDateTime("2017-09-13 16:00:00");
~~~