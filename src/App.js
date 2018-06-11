import React, { Component } from 'react';
import SongsList from './components/SongsList/SongsList';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

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

  componentDidMount() {
    fetch('/api').then(res => {
      if (res.ok) {
        return res.text();
      }
      throw Error('BAD');
    }).then(json => {
      console.log('JSON!', json)
    }).catch(err => console.error('ERROR! :(', err))
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
    const searchTerm = this.state.searchTerm.toLowerCase();
    const request = window.gapi.client.youtube.search.list({
      q: searchTerm,
      part: 'snippet',
      maxResults: 20
    });
    request.execute((response) => {
      this.setState({
        songs: response.items
      })
    });
  }

  render() {
    const {selectedTrack, songs} = this.state;
    console.log('NEW TRACK EVERYBODY', selectedTrack)
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">YTPlayer</h2>
          <div className="App-searchfield-container">
            <TextField
              id="App-textfield"
              onChange={this.handleSearchInput}
              value={this.state.searchTerm}
              hintText='Search an artist'
              hintStyle={{color: '#fff'}}
              style={{width: '180px'}}
            />
            <IconButton iconClassName="material-icons" onClick={this.handleFetchSongs}>
              search
            </IconButton>
          </div>
        </header>
        <AudioPlayer trackToPlay={selectedTrack} />
        <SongsList songs={songs} handleSelectSong={this.handleSongSelection}/>
      </div>
    );
  }
}

export default App;
