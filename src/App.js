import React, { Component } from 'react';
import SongsList from './components/SongsList/SongsList';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
// import YouTubePlayer from './components/YouTubePlayer/YouTubePlayer';
// import songsJSON from './data/songs';

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
    console.log('searchTerm', searchTerm);
    const request = window.gapi.client.youtube.search.list({
      q: searchTerm,
      part: 'snippet',
      maxResults: 20
    });
    request.execute((response) => {
      console.log('RESPONSE ITEMS', response)
      // let title = response.items[0].snippet.title;
      // let vidId = response.items[0].id.videoId;
      // console.log('Title: ', title, 'Video ID: ', vidId);
      // $('#search-container').html('<h4>' + title + '</h4>');
      // player.cueVideoById(vidId, 0, 'default');
      this.setState({
        songs: response.items
      })
    });
    // fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music`).then(res => {
    //   if (res.ok) {
    //     return res.json();
    //   } else {
    //     console.error(`Network response was not ok: ${res}`)
    //   }
    // }).then(json => {
    //   this.setState({
    //     songs: json.results,
    //     selectedTrack: null,
    //     searchTerm: ''
    //   });
    // }).catch(error => console.error(`There was a problem with your fetch operation: ${error.message}`));
  }

  render() {
    const {selectedTrack, songs} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Music Player</h1>
          <div className="App-searchfield-container">
            <TextField
              id="App-textfield"
              onChange={this.handleSearchInput}
              value={this.state.searchTerm}
              hintText='Search an artist'
              hintStyle={{color: '#fff'}}
              style={{width: '200px'}}
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
