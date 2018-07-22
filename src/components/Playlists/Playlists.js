import React, { Component } from 'react';
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem';

import './Playlists.css';

class Playlists extends Component {
  state = {
    itemSelected: null
  }

  handleSelectPlaylist = (playlist) => {
    console.log('playlist', playlist);
    this.props.passPlaylistIdToParent(playlist.id);
    // this.setState({itemSelected: song.id.videoId});
    // // this.props.handleSelectSong(song);
    // fetch('/getUrl', {
    //   method: 'POST',
    //   body: JSON.stringify({ url:`https://www.youtube.com/watch?v=${song.id.videoId}`}),
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // }).then(res => {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   throw Error('BAD');
    // }).then(json => {
    //   console.log('JSON!', json)
    //   this.props.handleSelectSong(json.url);
    // }).catch(err => console.error('ERROR! :(', err))
                // handleSelectSong={() => this.handleClickSong(song, index)}
                // selected={itemSelected === song.id.videoId}
  }

  render() {
    const {playlists} = this.props;
    // const {itemSelected} = this.state;

    return (
      <div className='Playlists__flex-container'>
        {
          playlists && playlists.map(playlist => {
            return (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                selectPlaylist={this.handleSelectPlaylist}
              />
            )
          })
        }
      </div>
    )
  }
}

export default Playlists
