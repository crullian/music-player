import React, { Component } from 'react';
import SongItem from '../../components/SongItem/SongItem';

import './SongsList.css';

class SongsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: null
    }
    this.handleClickSong = this.handleClickSong.bind(this);
  }

  handleClickSong(song) {
    this.setState({itemSelected: song.id.videoId});
    this.props.handleSelectSong(song);
  }

  render() {
    const {songs} = this.props;
    const {itemSelected} = this.state;

    return (
      <div className='SongsList__flex-container'>
        {
          songs && songs.filter(song => {
            // filter out playlists for now
            return song.id.kind === 'youtube#video';
          }).map((song, index) => {
            return (
              <SongItem
                key={index}
                song={song}
                handleSelectSong={() => this.handleClickSong(song, index)}
                selected={itemSelected === song.id.videoId}
              />
            )
          })
        }
      </div>
    )
  }
}

export default SongsList