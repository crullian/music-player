import React, { Component } from 'react';
import GoogleApi from './api/GoogleApi';
import SongsList from './components/SongsList/SongsList';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import RaisedButton from 'material-ui/RaisedButton';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: null,
      searchTerm: '',
      songs: [],
      playlists: [],
      isSignedIn: false
    }
    this.handleSongSelection = this.handleSongSelection.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleFetchSongs = this.handleFetchSongs.bind(this);
  }

  componentDidMount() {
    const googleApi = new GoogleApi();
    googleApi.init().then(res => {
      this.setState({
        isSignedIn: res.isSignedIn
      })
      this.handleFetchPlaylists();
    });
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

  handleFetchPlaylists = () => {
    const request = window.gapi.client.request({
      'method': 'GET',
      'path': '/youtube/v3/playlists',
      'params': {
        'mine': 'true',
        'maxResults': '20',
        'part': 'snippet,contentDetails'
      }
    });
    request.execute((response) => {
      this.setState({
        playlists: response.items
      })
    });
  }

  handleSignIn = () => {
    const googleApi = new GoogleApi();
    googleApi.signIn().then(res => {
      this.setState({isSignedIn: true})
    }).catch(err => console.error('ERROR!', err));
  }

  handleSignOut = () => {
    const googleApi = new GoogleApi();
    googleApi.signOut().then(res => {
      this.setState({isSignedIn: false})
    }).catch(err => console.error('ERROR!', err));
  }

  render() {
  {/*<RaisedButton
    secondary={true}
    label="Sign Out"
    onClick={this.handleSignOut}
  />*/}
    const {selectedTrack, songs, isSignedIn, playlists} = this.state;
    // console.log('NEW TRACK EVERYBODY', selectedTrack)
    console.log('PLAYLISTS', playlists);
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
        {!isSignedIn &&
          <RaisedButton
            primary={true}
            label="Sign In"
            onClick={this.handleSignIn}
          />
        }
        <SongsList songs={songs} handleSelectSong={this.handleSongSelection}/>
      {/*<Playlists playlists={playlists} />*/}
      </div>
    );
  }
}

export default App;
