---
layout: default
---
# 音频播放
## 音乐播放示例代码

```c++
// 创建ZKMediaPlayer对象
ZKMediaPlayer *sMediaPlayerPtr = new ZKMediaPlayer(ZKMediaPlayer::E_MEDIA_TYPE_AUDIO);

// 注册消息监听
sMediaPlayerPtr->setPlayerMessageListener(&sPlayerMessageListener);

// 消息监听接口如下
class PlayerMessageListener : public ZKMediaPlayer::IPlayerMessageListener {
public:
    virtual void onPlayerMessage(ZKMediaPlayer *pMediaPlayer, int msg, void *pMsgData) {
        switch (msg) {
        case ZKMediaPlayer::E_MSGTYPE_ERROR_INVALID_FILEPATH:
        case ZKMediaPlayer::E_MSGTYPE_ERROR_MEDIA_ERROR:
            // 出错消息
            break;

        case ZKMediaPlayer::E_MSGTYPE_PLAY_STARTED:
            // 开始播放消息
            break;

        case ZKMediaPlayer::E_MSGTYPE_PLAY_COMPLETED:
            // 播放结束消息
            break;
        }
    }
};
static PlayerMessageListener sPlayerMessageListener;


// 音乐操作接口说明
sMediaPlayerPtr->play("/mnt/extsd/music/test.mp3");	// 播放指定路径的文件
sMediaPlayerPtr->pause();	// 暂停播放
sMediaPlayerPtr->resume();	// 恢复播放
sMediaPlayerPtr->seekTo(int msec);	// 跳转到msec时间播放， msec 单位: ms
sMediaPlayerPtr->stop();	// 停止播放
sMediaPlayerPtr->isPlaying();	// 是否播放中，返回bool型

sMediaPlayerPtr->getDuration();	// 获取当前播放歌曲的总时间
sMediaPlayerPtr->getCurrentPosition();	// 获取当前播放歌曲的当前播放时间点

sMediaPlayerPtr->setVolume(0.5, 0.5);	// 设置媒体音量，音量范围：0.0 ~ 1.0
```

[**音乐播放Demo代码**](https://github.com/zkswe/MusicDemo/archive/master.zip)
