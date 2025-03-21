/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React, {useState} from 'react';
import classes from './Playlist.module.css'
import Track from '../Track/Track';
import Spotify from '../../utils/spotify.js'


const Playlist = ({playList, handleTrackFunction}) => {

    const [playlistName, setPlaylistName] = useState('');

    const list =  playList ? playList.map((trk, index) => {
            return <Track key={index} track={trk} inPlaylist={true}  handleTrackFunction={handleTrackFunction}/>;
        }) : null;
    const handleSaveBtn = (event) => {
    
        if(playlistName) {
            Spotify.savePlaylist(playlistName,playList);
        } else {
            alert('Please enter a playlist name');
        }
    };

    const handleChange = ({target}) => {
        const {value} = target;
        setPlaylistName(value);
    };
    
    return (
        <>
            <div className={classes.listContainer} >
                <input onChange={handleChange} className={classes.playlistTitle} placeholder='Playlist Name...' value={playlistName}/>
                {list}
                <button onClick={handleSaveBtn} className={classes.saveToSpotify}>  
                Save To Spotify
                </button> 
            </div>
        </>
    );

}

export default Playlist;