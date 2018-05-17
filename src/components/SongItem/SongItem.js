import React, { Component } from 'react';
import moment from 'moment';

import './SongItem.css';

class SongItem extends Component {

  render() {
    const {song, selected} = this.props;
    const trackTime  = moment(song.trackTimeMillis).format('mm:ss');

    return (
      <div
        className={`SongItem-container${selected ? ' selected' : ''}`}
        onClick={() => this.props.handleSelectSong(song)}
      >
        <img
          src={song.snippet.thumbnails.default.url}
          width='160'
          height='160' 
          alt='track artwork' 
          className='SongItem-img'
        />
        <div className='SongItem-info'>
          <h3>{song.snippet.title}</h3>
          {/*<p>{song.artistName}</p>*/}
          {/*<p>{trackTime}</p>*/}
          {selected && 
            <div className='SongItem-info-em'>
              <em>Currently selected...</em>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default SongItem;
