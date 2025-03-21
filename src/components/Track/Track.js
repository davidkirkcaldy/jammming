/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React from 'react';
import classes from './Track.module.css';

const Track = ({track, inPlaylist, handleTrackFunction}) => {
    const handleBtnClick = ({target}) => {
        handleTrackFunction(track, inPlaylist);
    }
    return (
        <div className={classes.trackContainer}>
            <div>
                <h3 className={classes.trackTitle}><strong>Song: </strong>"{track.name}"</h3>
                <p className={classes.trackInfo}><strong>Artist: </strong>{track.artist} , <strong>Album: </strong>{track.album}</p>
            </div>
            <button onClick={handleBtnClick} className={classes.addTrackBtn}>{inPlaylist ? '-' : '+'}</button>
        </div>
    );
}

export default Track;