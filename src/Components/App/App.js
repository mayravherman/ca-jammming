import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman Across The Water'
        },
        {
          name: 'Tiny Dancer',
          artist: 'Tim McGraw',
          album: 'Love Story'
        },
        {
          name: 'Tiny Dancer',
          artist: 'Rockabye Baby!',
          album: 'Lullaby Renditions of Elton John'
        }
      ],
      playlistName: 'Best Playlist Ever',
      playlistTracks: [
        {
          name: 'Stronger',
          artist: 'Britney Spears',
          album: 'Oops!... I Did It Again'
        },
        {
          name: 'So Emotional',
          artist: 'Whitney Houston',
          album: 'Whitney'
        },
        {
          name: `It's Not Right But It's Okay`,
          artist: 'Whitney Houston',
          album: 'My Love Is Your Love'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
