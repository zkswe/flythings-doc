
[TOC]
# 控件概要
### 属性

1.绘制区域
![](https://box.kancloud.cn/24af134cc8bfb1c94434a91eb1cdb9cc_294x218.png)
2.图表风格 （曲线、折线）

### 方法

~~~
// index 代表第几条线
void setPenWidth(int index, int width);// 设置画笔宽度
void setPenColor(int index, ARGB color);// 设置画笔颜色
void setXScale(int index, double xScale);// 设置x方向的缩放比例
void setYScale(int index, double yScale);// 设置y方向的缩放比例
void setData(int index, const MPPOINT *pPoints, int count);// 填充数据
~~~

# UI贴图
1. 波形图控件贴图首先区分两种控件：
	* 波形图:这个是波形的的容器，用于在一个波形图上显示多个波形图
	![](images/screenshot_1511516038545.png)
	* 波形子项：用于将数据绘制成波形图，一个波形图里面允许有多个波形子项，也就是说：一个坐标轴上可以有多个图形的效果。
2. 贴上两个波形，配置不同的颜色和属性
* 选择波形子项的时候通过这个页面下去选择
![](images/screenshot_1511516209558.png)
* 波形2设置为弧形黄色
![](images/screenshot_1511516249618.png)
* 波形1设置为红色，折现显示
![](images/screenshot_1511516262986.png)
* 波形设置的重点属性介绍
![](images/screenshot_1511516344262.png)
* 多贴几张波形，一起看一下效果
![](images/screenshot_1511520164959.png)

# 源码修改
## 定义需要使用的一些变量
~~~
// 波形数据存储区
#define DIAGRAM_SIZE 30
static MPPOINT sPoints[DIAGRAM_SIZE];
static MPPOINT sPoints1[DIAGRAM_SIZE];
//取波形数据里面的偏移值
static int mpointindex = 0;
~~~

## 添加波形移动的方法
~~~
static void movePoints(MPPOINT* p,int size){
	for(int i =0;i < size-1;i++){
		p[i].y = p[i+1].y;
	}
	p[size-1].y = 0;
}
~~~

## 添加定时，用于定时刷新波形数据
~~~
/**
 * 注册定时器
 * 在此数组中添加即可
 */
static S_ACTIVITY_TIMEER REGISTER_ACTIVITY_TIMER_TAB[] = {
		{0,  200}, //定时器id=0,80ms刷新一个波形数据
	//{1,  1000},
};
~~~

## 初始化的时候默认数据
~~~

static void onUI_init(){
    //Tips :添加 UI初始化的显示代码到这里,如:mText1->setText("123");
	// 初始化一下要使用的数据
	for(int i =0;i < DIAGRAM_SIZE;i++){
		sPoints[i].x = (100*i)/DIAGRAM_SIZE;
		sPoints[i].y = 50;
	}
	for(int i =0;i < DIAGRAM_SIZE;i++){
		sPoints1[i].x = (100*i)/DIAGRAM_SIZE;
		sPoints1[i].y = 50;
	}
	// 初始化波形显示内容
	mDiagram1Ptr->setData(0,sPoints,DIAGRAM_SIZE);
	mDiagram1Ptr->setData(1,sPoints1,DIAGRAM_SIZE);
	mDiagram2Ptr->setData(0,sPoints,DIAGRAM_SIZE);
	mDiagram3Ptr->setData(0,sPoints1,DIAGRAM_SIZE);
}

~~~
## 定时器里面更新UI显示
**实际项目可以通过串口数据修改**
~~~
bool bRefresh = true;
static bool onUI_Timer(int id){
    //Tips:添加定时器响应的代码到这里,但是需要在本文件的 REGISTER_ACTIVITY_TIMER_TAB 数组中 注册
    //id 是定时器设置时候的标签,这里不要写耗时的操作，否则影响UI刷新,ruturn:[true] 继续运行定时器;[false] 停止运行当前定时器
	if(id == 0){
		if(!bRefresh){
			return true;
		}
		/** 模拟一个数据
		 *
		 */
		mpointindex++;
		if(mpointindex >= 30){
			mpointindex = 0;
		}
		movePoints(sPoints,DIAGRAM_SIZE);
		movePoints(sPoints1,DIAGRAM_SIZE);
		if(mpointindex%16 == 0){
			sPoints[DIAGRAM_SIZE-1].y = 95;
		}else if(mpointindex%8 == 0){
			sPoints[DIAGRAM_SIZE-1].y = 5;
		}else if(mpointindex%7 == 0){
			sPoints[DIAGRAM_SIZE-1].y = 40;
		}else{
			sPoints[DIAGRAM_SIZE-1].y = 50;
		}
		// 为了方便看到演示效果，我们把波形2的数据和波形1的数据做个相反的数据
		sPoints1[DIAGRAM_SIZE-1].y =100-sPoints[DIAGRAM_SIZE-1].y;

		// 数据和波形图绑定
		mDiagram1Ptr->setData(0,sPoints,DIAGRAM_SIZE);
		mDiagram1Ptr->setData(1,sPoints1,DIAGRAM_SIZE);
		mDiagram2Ptr->setData(0,sPoints,DIAGRAM_SIZE);
		mDiagram3Ptr->setData(0,sPoints1,DIAGRAM_SIZE);
	}
	return true;
}
~~~
## 添加一个按键控制波形是否滚动
~~~
static bool onButtonClick_ButtonOnOff(ZKButton *pButton) {
    //LOGD(" ButtonClick ButtonOnOff !!!\n");
	bRefresh = !bRefresh;
	mButtonOnOffPtr->setSelected(!bRefresh);
    return true;
}
~~~

# 样机效果
![](images/screenshot_1511521912812.png)

# 代码路径
https://gitee.com/zkswe/SampleControls
WaveViewLogic.cc