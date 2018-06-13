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
    // this.props.handleSelectSong(song);
    fetch('/getUrl', {
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
      console.log('JSON!', json)
      this.props.handleSelectSong(json);
    }).catch(err => console.error('ERROR! :(', err))
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