import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import './index.css';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#fe2d14',
    textColor: '#fff'
  }
});

const tag = document.createElement('script');

tag.src = "https://apis.google.com/js/client.js?onload=onClientLoad";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const onYouTubeApiLoad = () => {
  window.gapi.client.setApiKey('AIzaSyAz3W_FsqnyZUL9ImA8BrBeInXpnCk7Kv8');
};

window.onClientLoad = () => {
  window.gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
    , document.getElementById('root')
  );
  // registerServiceWorker();
};

