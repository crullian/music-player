import React, { Component } from 'react';
import SongsList from './components/SongsList/SongsList';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import songsJSON from './data/songs';
import logo from './logo.svg';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: null,
      searchTerm: '',
      songs: []
    }
    this.handleSongSelection = this.handleSongSelection.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleFetchSongs = this.handleFetchSongs.bind(this);
  }

  handleSongSelection(song) {
    this.setState({
      selectedTrack: song
    })
  }

  handleSearchInput(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleFetchSongs() {
    console.log('Q', this.state.searchTerm);
    const searchTerm = this.state.searchTerm.toLowerCase().replace(' ', '+');
    fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music`).then(res => { 
      return res.json();
    }).then(json => {
      console.log('JSON', json.results);
      this.setState({
        songs: json.results,
        selectedTrack: null,
        searchTerm: ''
      });
    })
  }

  render() {
    const {selectedTrack, songs} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Music Previewer</h1>
          <TextField
            id="App-textfield"
            onChange={this.handleSearchInput}
            value={this.state.searchTerm}
            hintText='Search an artist'
            style={{width: '150px'}}
          />
          <IconButton iconClassName="material-icons" onClick={this.handleFetchSongs}>
            search
          </IconButton>
        </header>
        <AudioPlayer trackToPlay={selectedTrack} />
        <SongsList songs={songs} handleSelectSong={this.handleSongSelection}/>
      </div>
    );
  }
}

export default App;
