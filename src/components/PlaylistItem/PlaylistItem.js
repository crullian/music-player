import React, { Component } from 'react';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './PlaylistItem.css'

const menuItems = [
  "Add to a playlist",
  "Share",
  "Settings",
  "Help"
];

class PlaylistItem extends Component {
  render() {
    // console.log('PLAYLIST', this.props.playlist);
    const { playlist, selected } = this.props;
    return (
      <div
        className={`PlaylistItem-container${selected ? ' selected' : ''}`}
      >
        <div style={{display: 'flex'}} onClick={() => this.props.selectPlaylist(playlist)}>
          <img
            src={playlist.snippet.thumbnails.default.url} 
            alt='track artwork' 
            className='PlaylistItem-img'
          />
          <div className='PlaylistItem-info'>
            <h3>{playlist.snippet.title}</h3>
            {/*<p>{song.artistName}</p>*/}
            {/*<p>{trackTime}</p>*/}
            {/*selected && 
              <div className='PlaylistItem-info-em'>
                <em>Currently selected...</em>
              </div>
            */}
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
    );
  }
}

export default PlaylistItem;
