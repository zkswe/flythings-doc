# Music player

Create a `ZKMediaPlayer` object of type `ZKMediaPlayer::E_MEDIA_TYPE_AUDIO`
```c++
static ZKMediaPlayer sPlayer(ZKMediaPlayer::E_MEDIA_TYPE_AUDIO);
```

Register message monitoring
```c++
// The message monitoring interface is as follows
class PlayerMessageListener : public ZKMediaPlayer::IPlayerMessageListener {
public:
    virtual void onPlayerMessage(ZKMediaPlayer *pMediaPlayer, int msg, void *pMsgData) {
        switch (msg) {
        case ZKMediaPlayer::E_MSGTYPE_ERROR_INVALID_FILEPATH:
        case ZKMediaPlayer::E_MSGTYPE_ERROR_MEDIA_ERROR:
            // Error message
            break;

        case ZKMediaPlayer::E_MSGTYPE_PLAY_STARTED:
            // Start message
            break;

        case ZKMediaPlayer::E_MSGTYPE_PLAY_COMPLETED:
            // End of play message
            break;
        }
    }
};
static PlayerMessageListener sPlayerMessageListener;


// Register message monitoring
sPlayer.setPlayerMessageListener(&sPlayerMessageListener);
```
Operation interface description
```c++
sPlayer.play("/mnt/extsd/music/test.mp3");	// Play the file in the specified path
sPlayer.pause();	// Pause playback
sPlayer.resume();	// Resume playback
sPlayer.seekTo(int msec);	// Jump to msec time to play, msec unit: ms
sPlayer.stop();	// stop playing
sPlayer.isPlaying();	// Whether it is playing, return bool type

sPlayer.getDuration();		// Get the total time of the currently playing song
sPlayer.getCurrentPosition();	// Get the current playing time of the currently playing song

sPlayer.setVolume(0.5, 0.5);	// Set media volume, volume range: 0.0 ~ 1.0
```

> [!Note]
> The audio file to be played cannot be too short, too short time may cause normal playback.

For the complete code, see[Sample Code](demo_download#demo_download.md)  `MusicDemo` project in the control sample