import React, { Component } from 'react';

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
      const audio = document.getElementById('audioPlayer');
      audio.addEventListener('loadedmetadata', () => {
        this.setState({
          duration: audio.duration,
          currentTime: audio.duration * 1000
        });
      }, false);
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

  render() {
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
          style={{padding: '0px'}}
          titleStyle={{display: 'none'}}
          iconStyleLeft={{margin: '0px 0px -4px'}}
          iconElementLeft={trackToPlay && 
            <img src={trackToPlay.artworkUrl100} alt='track artwork' />
          }
          showMenuIconButton={!!trackToPlay}
          className='AudioPlayer__tool-bar'
        >
          <div className='AudioPlayer__info'>
            <h2>
              {(trackToPlay && trackToPlay.trackName) || 'Select a track'}
            </h2>
            { trackTime }
            { audio }
          </div>
        </AppBar>
        
        <FloatingActionButton secondary={true} className='AudioPlayer__fab'>
          <FontIcon className="material-icons" onClick={this.togglePlay}>
            {isPlaying ? 'pause' : 'play_arrow'}
          </FontIcon>
        </FloatingActionButton>
      </div>
    )
  }
}

export default AudioPlayer;
