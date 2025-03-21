/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React from 'react';
import classes from './Tracklist.module.css'
import Track from '../Track/Track';

const Tracklist = ({trackList, handleTrackFunction}) => {

    const list =  trackList ? trackList.map((trk, index) => {
            return <Track key={index} track={trk}  inPlaylist={false} handleTrackFunction={handleTrackFunction}/>;
        }): null;
    
    return (
        <div className={classes.listContainer} >
            <div className={classes.listTitleContainer}>
                <label className={classes.listTitle}>Search Results</label>
            </div>
            {list}
        </div>
    );

}

export default Tracklist;