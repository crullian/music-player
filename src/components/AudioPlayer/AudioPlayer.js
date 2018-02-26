import React, { Component } from 'react';
import moment from 'moment';
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
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  render() {
    const {isPlaying} = this.state;
    const {trackToPlay} = this.props;
    console.log('TRACK TO PLAY', trackToPlay && trackToPlay.trackName && trackToPlay.trackTimeMillis);
  
    return (
      <div className='AudioPlayer__container'>
        <AppBar
          title={(trackToPlay && trackToPlay.trackName) || 'Select a track'}
          showMenuIconButton={false}
          className='AudioPlayer__tool-bar'
        >
          {trackToPlay
            ? <Timer start={trackToPlay.trackTimeMillis} isCounting={isPlaying}/>
            : <h3>--:--</h3>
          }
        </AppBar>
        
        <FloatingActionButton secondary={true} className='AudioPlayer__fab'>
         {isPlaying
          ? <FontIcon className="material-icons" onClick={this.togglePlay}>
              pause
            </FontIcon>
          : <FontIcon className="material-icons" onClick={this.togglePlay}>
              play_arrow
            </FontIcon>
         }
        </FloatingActionButton>
      </div>
    )
  }
}

export default AudioPlayer;
