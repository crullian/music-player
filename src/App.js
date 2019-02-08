import React, { Component } from 'react';
import GoogleApi from './api/GoogleApi';

import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Loader from './components/Loader/Loader';
import Playlists from './components/Playlists/Playlists';
import SongsList from './components/SongsList/SongsList';

import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './App.css';

class App extends Component {

  state = {
    selectedTrack: null,
    searchTerm: '',
    songs: null,
    playlists: null,
    isSignedIn: true,
    isLoadingTrack: false,
    isLoadingList: true,
    isDrawerOpen: false,
    inlineChecked: JSON.parse(localStorage.getItem('inline')),
    autoplayChecked: JSON.parse(localStorage.getItem('autoplay'))
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
          isLoadingList: false,
          isSignedIn: false
        });
      }
    });
  }

  handleSongSelection = (song) => {
    this.setState({isLoadingTrack: true});
    return fetch('/getUrl', {
      method: 'POST',
      body: JSON.stringify({ 
        url:`https://www.youtube.com/watch?v=${song.id.videoId}`
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      console.log('RESP', res)
      if (res.ok) {
        return res.json();
      }
      throw Error('Response was not OK', res);
    }).then(json => {
      this.setState({
        selectedTrack: json,
        isLoadingTrack: false
      })
    }).catch(err => console.error('ERROR! :(', err))
  }

  handleSearchInput = (e) => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleFetchSongs();
    }
  } 

  handleFetchSongs = () => {
    this.setState({isLoadingList: true});
    const searchTerm = this.state.searchTerm.toLowerCase();
    const request = window.gapi.client.youtube.search.list({
      q: searchTerm,
      part: 'snippet',
      maxResults: 20
    });
    request.execute((response) => {
      this.setState({
        songs: response.items,
        isLoadingList: false
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
        isLoadingList: false
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

  handleCheckInline = () => {
    this.setState({
      inlineChecked: !this.state.inlineChecked
    });
    localStorage.setItem('inline', !this.state.inlineChecked);
  }

  handleCheckAutoPlay = () => {
    this.setState({
      autoplayChecked: !this.state.autoplayChecked
    });
    localStorage.setItem('autoplay', !this.state.autoplayChecked);
  }

  render() {
    const { selectedTrack, songs, isSignedIn, playlists, searchTerm,
      isLoadingTrack, isLoadingList, inlineChecked, autoplayChecked } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div style={{display: 'flex'}}>
            <IconButton
              iconClassName="material-icons"
              onClick={this.handleClickMenu}
            >
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
              hintStyle={{color: '#fff', bottom: '8px'}}
              style={{width: '150px', height: '40px'}}
            />
            <IconButton
              iconClassName="material-icons"
              onClick={this.handleFetchSongs}
            >
              search
            </IconButton>
          </div>
        </header>
        <AudioPlayer
          trackToPlay={selectedTrack}
          fetchingTrack={isLoadingTrack}
          hasSongs={!!songs}
          playsInline={inlineChecked}
          autoPlay={autoplayChecked}
        />
        
        {isLoadingList ?
          <Loader />
          :
          <div>
            {songs && searchTerm &&
              <SongsList
                songs={songs}
                handleSelectSong={this.handleSongSelection}
              />
            }
            {playlists && (!songs || !searchTerm) &&
              <Playlists playlists={playlists} />
            }
            {(!songs || !searchTerm) &&
              <div className="Auth_flex-container">
                <div className="Auth-card">
                  {!isSignedIn &&
                    <h2 className="center-text">
                      Sign in to view your playlists
                    </h2>
                  }
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
          <MenuItem>
            <h2 className="App-menu-title">YTPlayer</h2>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Checkbox
              style={{padding: '12px 0'}}
              label="Play inline"
              labelPosition="left"
              checked={inlineChecked}
              onCheck={this.handleCheckInline}
            />
          </MenuItem>
          <MenuItem>
            <Checkbox
              style={{padding: '12px 0'}}
              label="Auto play"
              labelPosition="left"
              checked={autoplayChecked}
              onCheck={this.handleCheckAutoPlay}
            />
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default App;
