import React, { Component } from 'react';
import SongsList from './components/SongsList/SongsList';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import songs from './data/songs';
import logo from './logo.svg';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: null
    }
    this.handleSongSelection = this.handleSongSelection.bind(this);
  }

  handleSongSelection(song) {
    this.setState({
      selectedTrack: song
    })
  }

  render() {
    const {selectedTrack} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Miles Player</h1>
        </header>
        <AudioPlayer trackToPlay={selectedTrack} />
        <SongsList songs={songs} handleSelectSong={this.handleSongSelection}/>
      </div>
    );
  }
}

export default App;
