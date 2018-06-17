import React, { Component } from 'react';

import Loader from '../../components/Loader/Loader';
import TimeRemaining from '../../components/Timer/TimeRemaining';

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
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.trackToPlay !== prevProps.trackToPlay) {
      this.setState({isPlaying: false, currentTime: null})
      // this.player.play();
      const audio = document.getElementById('audioPlayer');
      audio.addEventListener('loadedmetadata', () => {
        this.setState({
          duration: this.player.duration,
          currentTime: this.player.duration * 1000
        });
      }, false);
    }
  }

  componentWillUnmount() {
    const audio = document.getElementById('audioPlayer');
    audio.removeEventListener('loadedmetadata', () => {}, false);
  }

  handleTimeUpdate() {
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
    if (!this.props.trackToPlay || this.props.fetchingTrack) {
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
    const {trackToPlay, fetchingTrack, hasSongs, playsInline} = this.props;

    const trackTime = trackToPlay
    ? <TimeRemaining time={currentTime} />
    : <h3>--:--</h3>;
  
    return (
      <div className='AudioPlayer__container'>
        <AppBar
          style={{padding: '0px', background: '#000'}}
          titleStyle={{display: 'none'}}
          iconStyleLeft={{margin: '0px 0px -4px'}}
          iconElementLeft={trackToPlay && !fetchingTrack ?
            <video
              playsInline={playsInline}
              id="audioPlayer"
              ref={player => this.player = player}
              src={trackToPlay.url}
              className="player"
              onTimeUpdate={this.handleTimeUpdate}
            />
            : null
          }
          showMenuIconButton={!!trackToPlay && !fetchingTrack}
          className='AudioPlayer__tool-bar'
        >
        {fetchingTrack ?
          <Loader />
          :
          hasSongs &&
          <div className='AudioPlayer__info'>
            <h2>
              { (trackToPlay && trackToPlay.title) || 'Select a track' }
            </h2>
            { trackTime }
          </div>
        }
        </AppBar>
        
        {trackToPlay &&
          <FloatingActionButton className='AudioPlayer__fab'>
            <FontIcon className="material-icons" style={{color: '#fff'}} onClick={this.togglePlay}>
              {(isPlaying && !fetchingTrack) ? 'pause' : 'play_arrow'}
            </FontIcon>
          </FloatingActionButton>
        }
      </div>
    )
  }
}

export default AudioPlayer;
