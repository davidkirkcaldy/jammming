/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React from 'react';
import classes from './Playlist.module.css'
import Track from '../Track/Track';


const Playlist = ({playList}) => {

    const list =  playList ? playList.map((trk, index) => {
            return <Track key={index} track={trk} inPlaylist={true}/>;
        }) : null;
    
    return (
        <div className={classes.listContainer} >
            {list}
        </div>
    );

}

export default Playlist;