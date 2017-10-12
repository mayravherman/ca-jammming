// Spotify API Info
const clientId = '2fa4135652ac4780aec04bb85aa16c3f';
const redirectUri = 'http://makorepo.surge.sh';

let accessToken;

const Spotify = {
  getAccessToken() {
    // If an access token is already set, return it
    if (accessToken) {
      return accessToken;
    }
    // If access token isn't set, check URL to see if it has just been obtained
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      // Set access token and expiration time
      accessToken = accessTokenMatch[1];
      const expiresIn = expiresInMatch[1];
      // Wipe access token at expiration time
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      // Clear URL parameters
      window.history.pushState('Access Token', null, '/');
    } else {
      // In all other cases, redirect users to authorization req URL
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = url;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    // Use the access token to access the Spotify Web API
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => response.json()
    ).then(jsonResponse => {
      // If the JSON does not contain any tracks, return an empty array
      if (!jsonResponse.tracks) {
        return [];
      }
      // Map the converted JSON to an array of tracks
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    });
  },

  savePlaylist(name, trackUris) {
    // If either of the values isn't provided, return
    if (!name || !trackUris.length) {
      return;
    }
    // Default variables
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    let userId;
    // GET Spotify username
    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      // Save user id from response
      userId = jsonResponse.id;
      // POST new playlist in user's account
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        // Save playlist id from response
        const playlistId = jsonResponse.id;
        // POST tracks to playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({uris: trackUris})
        })
      });
    })
  }

};

export default Spotify;
