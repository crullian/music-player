import React, { Component } from 'react';

import Loader from '../../components/Loader/Loader';
// import Timer from '../../components/Timer/Timer';
import TimeRemaining from '../../components/TimeRemaining';

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
      // console.log('NEW trackToPlay', this.props.trackToPlay)
      // console.log('NEW TRACK TO PLAY', this.player && this.player.getCurrentTime())
      // const audio = document.getElementById('audioPlayer');
      // audio.addEventListener('loadedmetadata', () => {
      //   this.setState({
      //     duration: this.player.getDuration(),
      //     currentTime: this.player.getDuration() * 1000
      //   });
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

  render() {
    const {isPlaying, currentTime} = this.state;
    const {trackToPlay, fetchingTrack} = this.props;
    // console.log('%ctrackToPlay', 'color:yellow', trackToPlay);
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
  
    return (
      <div className='AudioPlayer__container'>
        <AppBar
          style={{padding: '0px', background: '#000'}}
          titleStyle={{display: 'none'}}
          iconStyleLeft={{margin: '0px 0px -4px'}}
          iconElementLeft={trackToPlay && !fetchingTrack &&
            <video
              id="audioPlayer"
              ref={player => this.player = player}
              src={trackToPlay.url}
              className="youTube-player"
            />
          }
          showMenuIconButton={!!trackToPlay && !fetchingTrack}
          className='AudioPlayer__tool-bar'
        >
        {fetchingTrack ?
          <Loader />
          :
          <div className='AudioPlayer__info'>
            <h2>
              {(trackToPlay && trackToPlay.title) || 'Select a track'}
            </h2>
            { trackTime }
          </div>
        }
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
