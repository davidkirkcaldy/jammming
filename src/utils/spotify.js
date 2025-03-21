/*
 *   Copyright (c) 2025 David Kirkcaldy
 *   All rights reserved.
 */

var access_token = 'BQBJ33ObadEKUDd3ivn_GgoJxwJta0GRe5rPzw1L1n0jXD-e2oZmN1mC0z1qUd3BceFXnLJUmGKWGn-IR9R0sU1MMnXGv8KOAWyEGuEcydb8NR26vxZXZdzsrkLHddzUf4gALf8uulL9HZOjp91U0NGjJwzK_vtBG3O6ROhLJYLWqRJrAkXnua7hp-WMfA8DLltYERgqwgN-ygpnxwUI9Eomxq18gb3h-RsJID6Z-zltyJgULDFQeXC2kZO7LntSB3xWkmHhdzjy2E1lfezOGUkQyCUq17DLTwIqub7PS8mleg&token_type=Bearer&expires_in=3600&state=iv2LN1JatnkbyZAj';
var user_id = '31ydlugf3j65i74esi5ibq26ghjm'; // "davidkirkcaldy";
const useDmmyData = false;

const Spotify = {
    getDummyData() {
        return [
            {id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1'},
            {id: '2', name: 'Track 2', artist: 'Artist 2', album: 'Album 2'},
            {id: '3', name: 'Track 3', artist: 'Artist 3', album: 'Album 3'}
        ];
    },
    search(term) {
        if(useDmmyData) {
            return new Promise((resolve, reject) => {
                resolve(this.getDummyData());
            }
            );
        }
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
                let aTracks = jsonResponse.tracks.items.map(track => {
                    let aTrack = {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                    return aTrack;
                });

                return aTracks;
            } else {
                console.log('No tracks found');
                return [];
            }
          });
    },

    savePlaylist(playlistName, playlist) {
        if (playlist && playlist.length > 0) {
            if(access_token === '') {
                access_token = this.getAccessToken();
            }
            if(!user_id) {
                user_id = this.getCurrentUserId();
            }
            if(user_id === '') {
                console.log('No user id found');
                return;
            }
            console.log(`Create playlist ${playlistName}`);
            const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;

            const headers = {
                Authorization: `Bearer ${access_token}`
            };
            const body = JSON.stringify({
                name: playlistName,
                public: false,
                description: 'New playlist created as example playlist'
            });
            return fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            }).then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Request failed');
            }, networkError => {
                console.log(networkError.message);
              }).then(jsonResponse => {
                if (jsonResponse) {
                    console.log('Playlist created', jsonResponse);
                    //let uris = playlist.map(track => track.uri);
                    //let snapshot_id = this.addToPlaylist(jsonResponse.id, uris);
                    //console.log('Playlist snapshot', snapshot_id);
                    let newPlaylist = {
                            id: jsonResponse.id,
                            description: jsonResponse.description,
                            href: jsonResponse.href,
                            name: jsonResponse.name,
                            owner: jsonResponse.owner
                        };
                        console.log('Playlist created', newPlaylist);
                        
                        let uris = playlist.map(track => track.uri);
                        let snapshot_id = this.addToPlaylist(newPlaylist.id, uris);
                        
                        console.log('Playlist snapshot', snapshot_id);
                        
                        return newPlaylist;
                    } else {
                        console.log('No playlist created');
                        return null;
                    }
              }
            ).catch(error => {
                console.log('Error creating playlist', error);
            }
            );
        } else {
            if(!playlistName) {
                alert('Please enter a playlist name');
            }
            console.log('No playlist or tracks found');
            console.log(`Playlist name: ${playlistName}`);
            console.log(`Playlist: ${playlist}`);
        }
    },

    addToPlaylist(playlistId, trackUris) {
        if (playlistId && trackUris) {
            if(access_token === '') {
                access_token = this.getAccessToken();
            }
            console.log(`Add tracks to playlist ${playlistId}`);
            const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

            const headers = {
                Authorization: `Bearer ${access_token}`
            };
            const body = JSON.stringify({
                uris: trackUris
            });
            return fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            }).then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Request failed');
            }, networkError => {
                console.log(networkError.message);
              }).then(jsonResponse => {
                if (jsonResponse) {
                    let snapshotId = jsonResponse.snapshot_id;
                    return snapshotId;
                } else {
                    console.log('No tracks added to playlist');
                    return null;
                }
              }
            ).catch(error => { 
                console.log('Error adding tracks to playlist', error);
            }
            );
        } else {
            console.log('No playlist or tracks found');
        }
    },

    getAccessToken() {
        // Read in userid.json to get the client id and secret
        return fetch('/userid.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to load userid.json');
            })
            .then(data => {
                // FIXME: This is not working as the access_token is not being written to the file
                // Only the client id and secret are available in the userid.json file
                if (data.access_token) {
                    console.log('Access token loaded from userid.json');
                    access_token = data.access_token;
                    return access_token;
                } else {
                    // Get a new access token
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
                        access_token = jsonResponse.access_token;
                        // Write the access token to userid.json
                        // FIXME: This should be done on the server and does work here anyway
                        // fetch('/userid.json', {
                        //     method: 'POST',
                        //     headers: {
                        //         'Content-Type': 'application/json'
                        //     },
                        //     body: JSON.stringify({ access_token: access_token })
                        // });
                        console.log(`Access Token: ${access_token}`);
                        return access_token;
                    });
                }
            });
        },
        getCurrentUserId() {  
            if(access_token === '') {
                access_token = this.getAccessToken();
            }
            console.log('Get current user profile');
            const url = `https://api.spotify.com/v1/me`;
            const headers = {
                Authorization: `Bearer ${access_token}`
            };
            console.log(`current access token: ${access_token}`);
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
                if (jsonResponse) {
                    console.log('User profile', jsonResponse);
                    return jsonResponse.id;
                } else {
                    console.log('No user profile found');
                    return null;
                }
              }
            ).catch(error => {
                console.log('Error getting user profile', error);
                return null;
            }
            );
        }   
}

export default Spotify;