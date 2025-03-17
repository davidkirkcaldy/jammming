/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React from 'react';
import classes from './Playlist.module.css'
import Track from '../Track/Track';
import Spotify from '../../utils/spotify.js'


const Playlist = ({playList, handleTrackFunction}) => {

    const list =  playList ? playList.map((trk, index) => {
            return <Track key={index} track={trk} inPlaylist={true}  handleTrackFunction={handleTrackFunction}/>;
        }) : null;
    const handleSaveBtn = (event) => {
        Spotify.savePlaylist(playList);
    };
    
    return (
        <>
            <div className={classes.listContainer} >
                {list}
                <button onClick={handleSaveBtn} className={classes.saveToSpotify}>  
                Save To Spotify
                </button> 
            </div>
        </>
    );

}

export default Playlist;