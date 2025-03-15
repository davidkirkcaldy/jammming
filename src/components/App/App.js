import React, {useState} from 'react';
import classes from './App.module.css';
import SearchBar from '../SearchBar/SearchBar.js';
import Tracklist from '../Tracklist/Tracklist.js';
import Playlist from '../Playlist/Playlist.js'
import Spotify from '../../utils/spotify.js'


function App() {
  const [trackList, setTrackList] = useState([]);
  const [playList, setPlayList]  = useState([{            
    name: `Tiny Dancer`,
    artist: 'Elton John',
    album: 'Madman Across The Water',
    id: 0
  }]);

  const searchSpotify = (term) => {
    const tracks = Spotify.search(term);
    setTrackList(tracks);
  }

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <h1>Ja<span className='header_m'>mmm</span>ing</h1>
      </header>
      <SearchBar searchSpotify={searchSpotify}/>
      <div className={classes.bothLists}>
        <Tracklist trackList={trackList}/>
        <Playlist playList={playList}/>
      </div>
    </div>
  );
}

export default App;
