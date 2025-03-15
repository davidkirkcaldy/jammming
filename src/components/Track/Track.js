/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React from 'react';
import classes from './Track.module.css';

const Track = ({track, inPlaylist}) => {
    return (
        <div className={classes.trackContainer}>
            <div>
                <h2 className={classes.trackTitle}>{track.name}</h2>
                <h3 className={classes.trackInfo}>{track.artist} , {track.album}</h3>
            </div>
            <button className={classes.addTrackBtn}>{inPlaylist ? '-' : '+'}</button>
        </div>
    );
}

export default Track;