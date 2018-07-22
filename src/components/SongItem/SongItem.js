import React, { Component } from 'react';
// import moment from 'moment';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './SongItem.css';

const menuItems = [
  "Add to a playlist",
  "Share",
  "Settings",
  "Help"
];

class SongItem extends Component {

  render() {
    const {song, selected} = this.props;
    // const trackTime  = moment(song.trackTimeMillis).format('mm:ss');

    return (
      <div
        className={`SongItem-container${selected ? ' selected' : ''}`}
      >
        <div style={{display: 'flex'}} onClick={() => this.props.handleSelectSong(song)}>
          <img
            src={song.snippet.thumbnails.default.url} 
            alt='track artwork' 
            className='SongItem-img'
          />
          <div className='SongItem-info'>
            <h3>{song.snippet.title}</h3>
            {/*<p>{trackTime}</p>*/}
            {selected && 
              <div className='SongItem-info-em'>
                <em>Currently selected...</em>
              </div>
            }
          </div>
        </div>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon color={'#000'}/></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
          useLayerForClickAway={true}
        >
          {menuItems.map((item, i) => (
            <MenuItem key={`${item}-${i}`} style={{color: '#000'}} primaryText={item} />
          ))}
        </IconMenu>
      </div>
    )
  }
}

export default SongItem;
