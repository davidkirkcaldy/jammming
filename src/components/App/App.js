import React, {useEffect, useState} from 'react';
import classes from './App.module.css';
import SearchBar from '../SearchBar/SearchBar.js';
import Tracklist from '../Tracklist/Tracklist.js';
import Playlist from '../Playlist/Playlist.js'
import Spotify from '../../utils/spotify.js'


function App() {
  const [trackList, setTrackList] = useState([]);
  const [playList, setPlayList]  = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect( () => {
    async function fetchData() {
      const tracks = await Spotify.search(searchTerm);
      setTrackList(tracks);
    }
    fetchData();
  },[searchTerm] );

  const getSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const handleTrackFunction = (track, inPlaylist) => {
    setPlayList((prev) => {
      return !inPlaylist ? 
            [track, ...prev] :
            prev.filter((t) => { return t.id !== track.id});
    })
  };

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <h1>Ja<span className='header_m'>mmm</span>ing</h1>
      </header>
      <SearchBar getSearchTerm={getSearchTerm}/>
      <div className={classes.bothLists}>
        <Tracklist trackList={trackList} handleTrackFunction={handleTrackFunction}/>
        <Playlist playList={playList}  handleTrackFunction={handleTrackFunction}/>
      </div>
    </div>
  );
}

export default App;
