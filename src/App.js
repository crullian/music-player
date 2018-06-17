import React, { Component } from 'react';
import GoogleApi from './api/GoogleApi';

import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Loader from './components/Loader/Loader';
import Playlists from './components/Playlists/Playlists';
import SongsList from './components/SongsList/SongsList';

import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: null,
      searchTerm: '',
      songs: null,
      playlists: null,
      isSignedIn: true,
      isFetchingTrack: false,
      isLoading: true,
      isDrawerOpen: false,
      inlineChecked: false
    }
    this.handleSongSelection = this.handleSongSelection.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleFetchSongs = this.handleFetchSongs.bind(this);
  }

  componentDidMount() {
    const googleApi = new GoogleApi();
    googleApi.init().then(res => {
      if (res.isSignedIn) {
        this.setState({
          isSignedIn: res.isSignedIn
        });
        this.handleFetchPlaylists();
      } else {
        this.setState({
          isLoading: false,
          isSignedIn: false
        });
      }
    });
  }

  handleSongSelection(song) {
    this.setState({isFetchingTrack: true});
    return fetch('/getUrl', {
      method: 'POST',
      body: JSON.stringify({ url:`https://www.youtube.com/watch?v=${song.id.videoId}`}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw Error('BAD');
    }).then(json => {
      this.setState({
        selectedTrack: json,
        isFetchingTrack: false
      })
    }).catch(err => console.error('ERROR! :(', err))
  }

  handleSearchInput(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleFetchSongs();
    }
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
        playlists: response.items,
        isLoading: false
      })
    });
  }

  handleSignIn = () => {
    const googleApi = new GoogleApi();
    googleApi.signIn().then(res => {
      this.setState({isSignedIn: true})
      this.handleFetchPlaylists();
    }).catch(err => console.error('ERROR!', err));
  }

  handleSignOut = () => {
    const googleApi = new GoogleApi();
    googleApi.signOut().then(res => {
      this.setState({isSignedIn: false, playlists: null})
    }).catch(err => console.error('ERROR!', err));
  }

  handleClickMenu = () => {
    this.openDrawer();
  }

  openDrawer = () => {
    this.setState({isDrawerOpen: true});
  }

  closeDrawer = () => {
    this.setState({isDrawerOpen: false});
  }

  updateCheck = () => {
    this.setState({
      inlineChecked: !this.state.inlineChecked
    });
  }

  render() {
    const { selectedTrack, songs, isSignedIn, playlists, searchTerm,
      isFetchingTrack, isLoading, inlineChecked } = this.state;
    console.log('Checked', inlineChecked);
    // console.log('PLAYLISTS', playlists);
    return (
      <div className="App">
        <header className="App-header">
          <div style={{display: 'flex'}}>
            <IconButton iconClassName="material-icons" onClick={this.handleClickMenu}>
              menu
            </IconButton>
            <h2 className="App-title">YTPlayer</h2>
          </div>
          <div className="App-searchfield-container">
            <TextField
              id="App-textfield"
              onChange={this.handleSearchInput}
              onKeyPress={this.handleKeyPress}
              value={searchTerm}
              hintText='Search an artist'
              hintStyle={{color: '#fff'}}
              style={{width: '150px', height: '40px'}}
            />
            <IconButton iconClassName="material-icons" onClick={this.handleFetchSongs}>
              search
            </IconButton>
          </div>
        </header>
        <AudioPlayer
          trackToPlay={selectedTrack}
          fetchingTrack={isFetchingTrack}
          hasSongs={!!songs}
          playsInline={inlineChecked}
        />
        
        {isLoading ?
          <Loader />
          :
          <div>
            {songs && searchTerm &&
              <SongsList songs={songs} handleSelectSong={this.handleSongSelection}/>
            }
            {playlists && (!songs || !searchTerm) &&
              <Playlists playlists={playlists} />
            }
            {(!songs || !searchTerm) &&
              <div className="Auth_flex-container">
                <div className="Auth-card">
                  {!isSignedIn && <h2 className="center-text">Sign in to view your playlists</h2>}
                  <div className="Auth-button-container">
                    {isSignedIn ?
                      <RaisedButton
                        primary={true}
                        label="Sign Out"
                        onClick={this.handleSignOut}
                      />
                      :
                      <RaisedButton
                        primary={true}
                        label="Sign In"
                        onClick={this.handleSignIn}
                      />
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }

        <Drawer
          containerStyle={{background: '#000'}}
          docked={false}
          width={200}
          open={this.state.isDrawerOpen}
          onRequestChange={this.closeDrawer}
        >
          <MenuItem>YTPlayer</MenuItem>
          <MenuItem>
            <Checkbox
              label="Play inline"
              labelPosition="left"
              onCheck={this.updateCheck}
            />
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default App;
