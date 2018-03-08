import React, { Component } from 'react';

import Timer from '../../components/Timer/Timer';

import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

import './AudioPlayer.css';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    }
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps && this.state.isPlaying) {
      this.setState({
        isPlaying: false
      })
    }
  }

  togglePlay() {
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
    const {isPlaying} = this.state;
    const {trackToPlay} = this.props;

    let trackTime = <h3>--:--</h3>;
    let audio = null;
    if (trackToPlay) {
      trackTime = (
        <Timer
          start={trackToPlay.trackTimeMillis}
          isCounting={isPlaying}
          resetAudioPlayer={this.togglePlay}
        />
      );
      audio = (
        <audio
          ref={player => this.player = player}
          src={trackToPlay.previewUrl}
        />
      );
    }
  
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
