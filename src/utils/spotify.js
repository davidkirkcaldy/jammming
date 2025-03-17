/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React from 'react';

const Spotify = {
    search(term) {
        // Create dummy data
        const tracklist = [{} ,{}, {}, {}, {}, {} ,{}, {}];

        return tracklist.map((t, index) => {
            return {            
                name: `Tiny Dancer - ${index}`,
                artist: 'Elton John',
                album: 'Madman Across The Water',
                id: index
            };
        });
    },

    savePlaylist(playlist) {
        if (playlist) {
        console.log(`Saving playlist, ${playlist.length} tracks`);
        } else {
            console.log('No playlist tracks found1');
        }
    }
}

export default Spotify;