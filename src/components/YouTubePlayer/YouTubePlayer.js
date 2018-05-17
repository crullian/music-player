import React from 'react';

class YouTubePlayer extends React.Component {
  render() {
    return (
      <div className="container">
        <iframe
          ref={player => this.player = player}
          src={`https://www.youtube.com/embed/${this.props.video}`}
          className="player" 
          type="text/html"
          width="100%"
          height="100%"
          frameBorder="0"
          title="iframePlayer"
        />
      </div>
    );
  }
}

export default YouTubePlayer;