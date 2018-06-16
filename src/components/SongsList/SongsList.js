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
    this.setState({itemSelected: song.trackId});
    this.props.handleSelectSong(song);
  }

  render() {
    const {songs} = this.props;
    const {itemSelected} = this.state;

    return (
      <div className='SongsList__flex-container'>
        {
          songs && songs.map((song, index) => {
            return (
              <SongItem
                key={index}
                song={song}
                handleSelectSong={() => this.handleClickSong(song, index)}
                selected={itemSelected === song.trackId}
              />
            )
          })
        }
      </div>
    )
  }
}

export default SongsList