import React, { Component } from 'react';
import YouTube from 'react-youtube';

// import Timer from '../../components/Timer/Timer';
import TimeRemaining from '../../components/TimeRemaining';

// import YouTubePlayer from '../../components/YouTubePlayer/YouTubePlayer';

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
    // this.player && this.player.clearVideo()
    if (newProps && this.state.isPlaying) {
      this.setState({
        isPlaying: false
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.trackToPlay !== prevProps.trackToPlay) {
      console.log('NEW trackToPlay', this.props.trackToPlay)
      // console.log('NEW TRACK TO PLAY', this.player && this.player.getCurrentTime())
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
      this.player.pause()
    } else {
      this.player.play();
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  // onReady = (event) => {
  //   console.log('EVENT', event, 'TRACK TIME', event.target.getDuration());
  //   this.player = event.target;
  //   this.setState({
  //     duration: event.target.getDuration(),
  //     currentTime: event.target.getDuration() * 1000
  //   });
  // }

  onPlay = () => {
    this.setState({isPlaying: true});
  }

  onPause = () => {
    this.setState({isPlaying: false})
  }

  // getDuration = (event) => {
  //   return new Promise((res, rej) => {
  //     const duration = event.target.getDuration();
  //     if (duration > 0) {
  //       res(duration);
  //     } else {
  //       rej('Shit happens');
  //     }
  //   })
  // }

  // onStateChange = (event) => {
  //   console.log('STATE CHANGE', event)
  //   if (event.data === 5) {
  //     this.player = event.target;
  //     console.log('this player', this.player)
  //     // this.getDuration(event).then((duration) => {      
  //     //   this.setState({
  //     //     duration: duration,
  //     //     currentTime: duration * 1000
  //     //   });
  //     // }).catch(err => console.error('ERR', err));
  //   }
  // }

  render() {
    // console.log('THIS STATE', this.state)
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
  
            // <YouTube
            //   className="youTube-player"
            //   videoId={trackToPlay.id.videoId}
            //   onReady={this.onReady}
            //   onPlay={this.onPlay}
            //   onPause={this.onPause}
            //   opts={{
            //     height: '80',
            //     width: '100',
            //     playerVars: {
            //       playsinline: 1,
            //       controls: 0,
            //       modestbranding: 1,
            //       enablejsapi: 1,
            //       origin: 'https://youtube-playlist-203322.appspot.com/'
            //     }
            //   }}
            //   onStateChange={this.onStateChange}
            // />
    return (
      <div className='AudioPlayer__container'>
        <AppBar
          style={{padding: '0px', background: '#000'}}
          titleStyle={{display: 'none'}}
          iconStyleLeft={{margin: '0px 0px -4px'}}
          iconElementLeft={trackToPlay &&
            <video
              ref={player => this.player = player}
              src={trackToPlay}
              className="youTube-player"
            />
          }
          showMenuIconButton={!!trackToPlay}
          className='AudioPlayer__tool-bar'
        >
          <div className='AudioPlayer__info'>
            <h2>
              {/*(trackToPlay && trackToPlay.snippet.title) || 'Select a track'*/}
            </h2>
            {/* trackTime */}
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
