import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      selectedAlbum: {},
    };
  }

  async componentDidMount() {
    const hashLoad = async () => {
      const id = window.location.hash.slice(1);
      if (id) {
        const res = await axios.get(`/albums/${id}`);
        this.setState({ selectedAlbum: res.data });
      } else {
        this.setState({ selectedAlbum: {} });
      }
    };
    window.addEventListener('hashchange', hashLoad);
    hashLoad();
    const res = await axios.get('/albums/');
    this.setState({ albums: res.data });
  }

  render() {
    const renderObj = this.state.selectedAlbum.name ? (
      <SingleAlbum album={this.state.selectedAlbum} />
    ) : (
      <Display albums={this.state.albums} />
    );

    return (
      <div className="container">
        <Sidebar />
        {renderObj}
      </div>
    );
  }
}

const Sidebar = () => {
  
  return (
    <div id="albums" className="row wrap">
      <h3>
        <a href="#">Albums</a>
      </h3>
    </div>
  );
};

const Display = ({ albums }) => {
  return (
    <div id="albums" className="row wrap">
      {albums.map((album) => (
        <AlbumDiv album={album} key={album.id} />
      ))}
    </div>
  );
};

const AlbumDiv = ({ album }) => {
  return (
    <div className="album">
      <a href={`#${album.id}`}>
        <img src={album.artworkUrl} />
        <p>{album.name}</p>
        <small>{album.artist.name}</small>
      </a>
    </div>
  );
};

const SongInfo = ({ song, artist }) => {
  return (
    <tr>
      <td>{song.id}</td>
      <td>{song.name}</td>
      <td>{artist}</td>
      <td>{song.genre}</td>
    </tr>
  );
};

const SingleAlbum = ({ album }) => {
  return (
    <div id="single-album" className="column">
      <AlbumDiv album={album} />
      <table id="songs">
        <tbody>
          <tr className="gray">
            <td />
            <td>#</td>
            <td>Name</td>
            <td>Artist</td>
            <td>Genre</td>
          </tr>
          {album.songs.map((song) => (
            <SongInfo song={song} artist={album.artist.name} key={song.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
