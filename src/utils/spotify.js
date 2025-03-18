/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */
import React from 'react';

var access_token = "BQAcri0Bp_2T-KW-MXa9zgz2X_R94sJeHYopmaTv4afKjiuQIampUoXVz_0f9D_GEVRemBq6VqqRSL6ShGUapkx-vrmSP2bApcRuFEfVPobtjgP6nA2CFc6HRR8puyPHQsMdaHzzHPY"; 
// "BQAJg70FIrrboccjgkWwrO96c0RG6SNMKzOEPEZCHzNWdT7cR0SOO8Sxu2-nYkhMwn0vVyvpp2zjGqJXHeEskszHdekGgCsAyrrf1up1Mh8ZarGOqiZMrtFFj2r3mo5Sw7q57UuJKfA";

const Spotify = {
    search(term) {
        if(access_token === '') {
            access_token = this.getAccessToken();
        }
        if(!term) {
            return;
        }
        console.log(`Searching Spotify for ${term}`);
        const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const headers = {
            Authorization: `Bearer ${access_token}`
        };
        return fetch(url, {
            headers: headers
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Request failed');
        }, networkError => {
            console.log(networkError.message);
          }).then(jsonResponse => {
            if (jsonResponse.tracks) {
                console.log(`${jsonResponse.tracks.items.length} Tracks found`);
                let aTracks = jsonResponse.tracks.items.map(track => {
                    let aTrack = {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name
                    }
                    //console.log(`Found Track id: ${track.id}, name: ${track.name}, artist: ${track.artists[0].name}, album: ${track.album.name}`);
                    return aTrack;
                });

                return aTracks;
            } else {
                console.log('No tracks found');
                return [];
            }
          });
    },

    savePlaylist(playlist) {
        if (playlist) {
        console.log(`Saving playlist, ${playlist.length} tracks`);
        } else {
            console.log('No playlist tracks found1');
        }
    },

    getAccessToken() {
        // Read in userid.json
        return fetch('/userid.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to load userid.json');
            })
            .then(data => {
                console.log(data);
                if (data.access_token) {
                    console.log('Access token loaded from userid.json');
                    access_token = data.access_token;
                    return access_token;
                } else {
                    // If userid.json does not exist, get a new access token
                    const url = 'https://accounts.spotify.com/api/token';
                    const headers = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };
                    const body = new URLSearchParams({
                        grant_type: 'client_credentials',
                        client_id: data.clientid,
                        client_secret: data.clientsecret
                    });
                    return fetch(url, {
                        method: 'POST',
                        headers: headers,
                        body: body
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Request failed');
                    }, networkError => {
                        console.log(networkError.message);
                    }).then(jsonResponse => {
                        console.log(jsonResponse);
                        access_token = jsonResponse.access_token;
                        // Write the access token to userid.json
                        fetch('/userid.json', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ access_token: access_token })
                        });
                        console.log(access_token);
                        return access_token;
                    });
                }
            });
        }
}

export default Spotify;