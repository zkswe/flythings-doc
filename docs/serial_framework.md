---
layout: default
---

# 串口通讯协议
## 视频讲解
<iframe 
    width="800" 
    height="450" 
    src="https://player.youku.com/embed/XMzIzMzA5NTQ3Ng?client_id=70425dd755d80061&password=undefined&autoplay=false"
    frameborder="0" 
    allowfullscreen>
</iframe>
## 代码框架
![](images/screenshot_1510990787282.png)

软件APP部分分为两层
* uart协议解析和封装的串口HAL层
	* UartContext :串口的实体控制层，提供串口的开关，发送，接受现成
	* ProtocolData.h :定义通讯的数据结构体，用于保存通讯协议转化出来的实际变量。
	* ProtocolSender：完成数据发送的封装，
	* ProtocolParser:完成数据的协议解析部分，然后将解析好的数据放到ProtocolData的数据结构中。同时管理了应用监听串口数据变化的回掉接口。
* APP应用接口层
	*	通过ProtocolParser：提供的接口注册串口数据接收监听获取串口更新出来的ProtocolData。
	*   通过ProtocolSender提供的接口往MCU发送指令信息

## 协议接收部分使用和修改方法
### 通讯协议格式修改
这里我们举一个比较常见的通讯协议例子：

| 协议头（2字节） | 命令（2字节） | 数据长度（1字节） | 数据（N） | 校验（1字节) |
| --- | --- | --- | --- | --- |
| 0XFFAA | Cmd | len | data | checksum |

ProtocolParser.cpp 文件，配置文件命令格式：
```c++
/* SynchFrame CmdID  DataLen Data CheckSum */
/*     2Byte  2Byte   1Byte	N Byte  1Byte */
// 最小长度: 2 + 2 + 1 + 1= 6

#define DATA_PACKAGE_MIN_LEN		6
#define CMD_HEAD1	0xFF
#define CMD_HEAD2	0x55

.....
/**
 * 功能：解析协议
 * 参数：pData 协议数据，len 数据长度
 * 返回值：实际解析协议的长度
 */
int parseProtocol(const BYTE *pData, UINT len) {
	UINT remainLen = len;	// 剩余数据长度
	UINT dataLen;	// 数据包长度
	UINT frameLen;	// 帧长度

	/**
	 * 以下部分需要根据协议格式进行相应的修改，解析出每一帧的数据
	 */
	while (remainLen >= DATA_PACKAGE_MIN_LEN) {
		// 找到一帧数据的数据头
		while ((remainLen >= 2) && ((pData[0] != CMD_HEAD1) || (pData[1] != CMD_HEAD2))) {
			pData++;
			remainLen--;
			continue;
		}

		if (remainLen < DATA_PACKAGE_MIN_LEN) {
			break;
		}

		dataLen = pData[4];
		frameLen = dataLen + DATA_PACKAGE_MIN_LEN;
		if (frameLen > remainLen) {
			// 数据内容不全
			break;
		}

		// 打印一帧数据，需要时定义一下DEBUG_PRO_DATA宏
#ifdef DEBUG_PRO_DATA
		for (int i = 0; i < frameLen; ++i) {
			LOGD("%x ", pData[i]);
		}
		LOGD("\n");
#endif

		// 检测校验码
		if (getCheckSum(pData, frameLen - 1) == pData[frameLen - 1]) {
			// 解析一帧数据
			procParse(pData, dataLen);
		} else {
			LOGE("CheckSum error!!!!!!\n");
		}

		pData += frameLen;
		remainLen -= frameLen;
	}

	return len - remainLen;
}

```

* 协议头需要修改

```c++
1.修改协议头部分的定义，如果协议头是一个长度，则要注意修改协议头判断部分语句。
#define DATA_PACKAGE_MIN_LEN		6
#define CMD_HEAD1	0xFF
#define CMD_HEAD2	0xAA

2.协议头长度变化的时候需要修改这里。
while ((mDataBufLen >= 2) && ((pData[0] != CMD_HEAD1) || (pData[1] != CMD_HEAD2)))

```

* 协议长度的位置或者长度计算方式发生变化的修改

```c++
这里的pData[4] 代表的是第5个数据是长度的字节，如果变化了在这里修改一下。
dataLen = pData[4];
帧长度一般是数据长度加上头尾长度。如果协议中传的长度计算方式发生变化修改这个部分。
frameLen = dataLen + DATA_PACKAGE_MIN_LEN;

```

* 校验发生变化的情况

```c++
当校验不一样的时候需要修改校验方法，
1.校验内容变化修改这个位置
if (getCheckSum(pData, frameLen - 1) == pData[frameLen - 1])
2.校验计算公式变化修改：
/**
 * 获取校验码
 */
BYTE getCheckSum(const BYTE *pData, int len) {
	int sum = 0;
	for (int i = 0; i < len; ++i) {
		sum += pData[i];
	}

	return (BYTE) (~sum + 1);
}

```

* 当完成一帧数据的接收后程序会调用procParse 解析

```c++
// 检测校验码
if (getCheckSum(pData, frameLen - 1) == pData[frameLen - 1]) {
	// 解析一帧数据
	procParse(pData, frameLen);
} else {
	LOGE("CheckSum error!!!!!!\n");
}

```

### 通讯协议数据怎么和UI控件对接
继续前面的协议框架我们进入到procParse的解析部分。
这里重点的代码是：ProtocolParser.cpp 
打开文件然后找到void procParse(const BYTE *pData, UINT len) 
```c++
/*
 * 协议解析
 * 输入参数:
 *     pData: 一帧数据的起始地址
 *     len: 帧数据的长度
 */
void procParse(const BYTE *pData, UINT len) {
	/*
	 * 解析Cmd值获取数据赋值到sProtocolData结构体中
     */
	switch (MAKEWORD(pData[2], pData[3])) {
	case CMDID_POWER:
		sProtocolData.power = pData[5];
		LOGD("power status:%d",sProtocolData.power);
		break;
	}
	notifyProtocolDataUpdate(sProtocolData);
}

```
以上 MAKEWORD(pData[2], pData[3]) 在我们的协议例子中表示Cmd值；
当数据解析完成后通过notifyProtocolDataUpdate 通知到页面UI更新，这个部分请参照后面的UI更新部分

* 数据结构

上面的协议解析到了sProtocolData 结构体中，sProtocolData 是一个静态的变量，用于保存MCU（或者其他设备）串口发送过来的数据值。
这个数据结构在ProtocolData.h文件中。这里可以添加整个项目里面需要使用到的通讯变量
```c++
typedef struct {
	// 可以在这里面添加协议的数据变量
	BYTE power;
} SProtocolData;

```

* UI更新

UI界面在工具生成Activity.cpp的时候就已经完成了registerProtocolDataUpdateListener ，也就是说当数据更新的时候logic里面页面程序就会收到数据。

```c++
static void onProtocolDataUpdate(const SProtocolData &data) {
    // 串口数据回调接口
	if (mProtocolData.power != data.power) {
		mProtocolData.power = data.power;
	}
    
	if (mProtocolData.eRunMode != data.eRunMode) {
		mProtocolData.eRunMode = data.eRunMode;
		mbtn_autoPtr->setSelected(mProtocolData.eRunMode == E_RUN_MODE_MANUAL);
		if (mProtocolData.eRunMode != E_RUN_MODE_MANUAL) {
			mbtn_external_windPtr->setText(mProtocolData.externalWindSpeedLevel);
			mbtn_internal_windPtr->setText(mProtocolData.internalWindSpeedLevel);
		}
	}
    ...
}

```
在代码里面我们看到一个变量 mProtocolData，这是一个页面里面的static 的变量。在onUI_init()的时候会初始化。
如：
```c++
static SProtocolData mProtocolData;
static void onUI_init() {
	//Tips :添加 UI初始化的显示代码到这里,如:mText1->setText("123");
	mProtocolData = getProtocolData(); // 初始化串口数据的结构体。
	// 开始初始化页面的UI显示
}

```

## 串口数据发送
打开ProtocolSender.cpp
当APP层需要发送数据给MCU（或其他设备）的时候直接调用sendProtocol 就可以了。
具体的协议封装由sendProtocol方法完成。用户可以根据自己的协议要求修改这个部分的代码。
```c++
/**
 * 需要根据协议格式进行拼接，以下只是个模板
 */
bool sendProtocol(const BYTE *pData, UINT16 len) {
	BYTE dataBuf[256];

	dataBuf[0] = 0xF0;
	dataBuf[1] = 0x5A;	// 同步帧头

	dataBuf[2] = HIBYTE(len);
	dataBuf[3] = LOBYTE(len);		// 数据长度

	UINT frameLen = 4;

	// 数据
	for (int i = 0; i < len; ++i) {
		dataBuf[frameLen++] = pData[i];
	}

	// 校验码
	dataBuf[frameLen] = getCheckSum(dataBuf, frameLen);
	frameLen++;

	return UARTCONTEXT->send(dataBuf, frameLen);
}

```
当界面上有个按键按下的时候可以操作：
```c++
BYTE mode[]= {0x01,0x02,0x03,0x04};
sendProtocol(mode, 4);
```
