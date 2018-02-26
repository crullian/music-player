import React from 'react';
import moment from 'moment';

import './SongsList.css';

const SongsList = ({songs, handleSelectSong}) => (
  <div className='SongsList__flex-container'>
    {
      songs.map((song, index) => {
        const trackTime  = moment(song.trackTimeMillis).format('mm:ss');
        return (
          <div key={index} className='SongsList__song-item-container' onClick={() => handleSelectSong(song)}>
            <img src={song.artwork} width='160' height='160' alt='track artwork' className='SongsList__song-item-img' />
            <div className='SongsList__song-item-info'>
              <h3>{song.trackName}</h3>
              <p>{song.artistName}</p>
              <p>{trackTime}</p>
              <p>{song.releaseYear}</p>
            </div>
          </div>
        )
      })
    }
  </div>
)

export default SongsList