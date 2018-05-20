import React, { Component } from 'react';
import YouTube from 'react-youtube';

// import Timer from '../../components/Timer/Timer';
import TimeRemaining from '../../components/TimeRemaining';

import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

import './AudioPlayer.css';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentTime: null,
      duration: null
    }
    this.player = null;
    this.togglePlay = this.togglePlay.bind(this);
    this.handleTimeUptate = this.handleTimeUptate.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps && this.state.isPlaying) {
      this.setState({
        isPlaying: false
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.trackToPlay !== prevProps.trackToPlay) {
      // const audio = document.getElementById('audioPlayer');
      // audio.addEventListener('loadedmetadata', () => {
        // this.setState({
        //   duration: this.player.getDuration(),
        //   currentTime: this.player.getDuration() * 1000
        // });
      // }, false);
    }
  }

  handleTimeUptate() {
    if (this.player.ended) {
      this.setState({
        currentTime: this.state.duration * 1000,
        isPlaying: false
      });
    } else {
      this.setState({
        currentTime: Math.floor(this.state.duration - this.player.currentTime) * 1000
      });
    }
  }

  togglePlay() {
    if (!this.props.trackToPlay) {
      return;
    }
    if (this.state.isPlaying) {
      this.player.pauseVideo()
    } else {
      this.player.playVideo();
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  onReady = (event) => {
    console.log('EVENT', event, 'TRACK TIME', event.target.getDuration());
    this.player = event.target;
    this.setState({
      duration: event.target.getDuration(),
      currentTime: event.target.getDuration() * 1000
    });
  }

  onPlay = () => {
    this.setState({isPlaying: true});
  }

  onPause = () => {
    this.setState({isPlaying: false})
  }

  onStateChange = (event) => {
    if (event.data === 5) {
      const duration = event.target.getDuration();
      console.log('STATE CHANGE', event, duration)
      this.setState({
        duration: duration,
        currentTime: duration * 1000
      });
    }
  }

  render() {
    console.log('THIS STATE', this.state)
    const {isPlaying, currentTime} = this.state;
    const {trackToPlay} = this.props;
    
    // trackTime = (
    //   <Timer
    //     start={trackToPlay.trackTimeMillis}
    //     isCounting={isPlaying}
    //     resetAudioPlayer={this.togglePlay}
    //   />
    // );

    const trackTime = trackToPlay
    ? <TimeRemaining time={currentTime} />
    : <h3>--:--</h3>;
    const audio = trackToPlay
    ? (
        <audio
          id='audioPlayer'
          ref={player => this.player = player}
          src={trackToPlay.previewUrl}
          onTimeUpdate={this.handleTimeUptate}
        />
      )
    : null;
  
    return (
      <div className='AudioPlayer__container'>
        <AppBar
          style={{padding: '0px', background: '#fff'}}
          titleStyle={{display: 'none'}}
          iconStyleLeft={{margin: '0px 0px -4px'}}
          iconElementLeft={trackToPlay && 
            <YouTube
              className="youTube-player"
              videoId={trackToPlay.id.videoId}
              onReady={this.onReady}
              onPlay={this.onPlay}
              onPause={this.onPause}
              opts={{
                height: '120',
                width: '103',
                playerVars: {
                  playsinline: 1,
                  controls: 0,
                  modestbranding: 1
                }
              }}
              onStateChange={this.onStateChange}
            />
          }
          showMenuIconButton={!!trackToPlay}
          className='AudioPlayer__tool-bar'
        >
          <div className='AudioPlayer__info'>
            <h2>
              {(trackToPlay && trackToPlay.snippet.title) || 'Select a track'}
            </h2>
            { trackTime }
            {/* audio */}
          </div>
        </AppBar>
        
        <FloatingActionButton className='AudioPlayer__fab'>
          <FontIcon className="material-icons" style={{color: '#fff'}} onClick={this.togglePlay}>
            {isPlaying ? 'pause' : 'play_arrow'}
          </FontIcon>
        </FloatingActionButton>
      </div>
    )
  }
}

export default AudioPlayer;
