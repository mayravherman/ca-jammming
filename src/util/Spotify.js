// Spotify API Info
const clientId = '2fa4135652ac4780aec04bb85aa16c3f';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {
  // Get access token
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
      // Wipe access token and URL parameters
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    }
  }
};

export default Spotify;
