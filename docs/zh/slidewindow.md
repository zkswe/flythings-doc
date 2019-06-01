---
show_title: false
permalink: /docs/zh/slidewindow
key: docs-slidewindow-zh
sidebar:
  nav: docs-zh
aside:
  toc: true
layout: article
---

# 滑动窗口
滑动窗口控件与手机主界面九宫格左右滑动的界面效果类似。由一个滑动主窗口和多个图标组成。
## 如何使用
1. 首先在UI文件中创建一个 **滑动主窗口** 控件，然后再添加多个 **滑动窗口图标** 控件到 主窗口控件中。 

   ![创建滑动窗口](assets/slidewindow/add_slidewindow.gif)

2.  添加 **滑动窗口图标** 控件时，它会自动按顺序排列图标，如果添加满一页后，继续添加也会自动翻页。所有添加的图标控件都可以在 **大纲视图** 中找到。     

    ![](assets/slidewindow/outline.png)  
    
    如果想调整 **滑动窗口图标** 排列的位置，你可以在大纲视图中选中节点,然后直接通过拖拽来调整。注意下面动画左下角大纲视图的操作。   
    
    ![](assets/slidewindow/outline2.gif)

3. 在 **大纲视图** 中，选中 **滑动窗口图标** 控件，可以分别添加图片以及修改文字；选中整个 **滑动主窗口** 可以调整排列的 行数 和 列数， 还可以统一调整字体大小、图标大小。  

    ![添加icon](assets/slidewindow/add_icon.gif)  
  
  
## 代码操作  
1.如果你添加了滑动窗口控件，那么在编译后，会自动生成关联函数， 函数具体介绍参考[滑动窗口关联函数](relation_function#slidewindow)

2.一般情况下，我们只需要通过触摸滑动来上下翻页。但是，我们也提供了相应的翻页函数。  

```c++
// 切换到下一页
void turnToNextPage(bool isAnimatable = false);
// 切换到上一页
void turnToPrevPage(bool isAnimatable = false);
```
参数 `bool isAnimatable` 表示是否开启翻页时的动画; 默认为`false`，表示关闭动画

3.我们还可以通过代码监听到滑动窗口翻到了第几页：

```c++
namespace { // 加个匿名作用域，防止多个源文件定义相同类名，运行时冲突

// 实现自己的监听接口
class MySlidePageChangeListener : public ZKSlideWindow::ISlidePageChangeListener {
public:
    virtual void onSlidePageChange(ZKSlideWindow *pSlideWindow, int page) {
        LOGD("page: %d\n", page);
    }
};

}

// 定义监听对象
static MySlidePageChangeListener sMySlidePageChangeListener;

static void onUI_init() {
    mSlidewindow1Ptr->setSlidePageChangeListener(&sMySlidePageChangeListener);
}
```
获取当前页接口`getCurrentPage()`。

# 样例代码
效果图    

 ![](assets/slidewindow/preview.png)  

具体滑动窗口控件的使用，参考[样例代码](demo_download#demo_download)  