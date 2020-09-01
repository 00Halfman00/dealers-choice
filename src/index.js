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
    this.getAlbum = this.getAlbum.bind(this);
  }

  async getAlbum(albumId, select = true) {
    if (select) {
      const res = await axios.get(`/albums/${albumId}`);
      console.log('in getAlbum ', res.data);
      this.setState({ selectedAlbum: res.data });
    } else {
      this.setState({ selectedAlbum: {} });
    }
  }

  async componentDidMount() {
    const res = await axios.get('/albums/');
    this.setState({ albums: res.data });
  }

  render() {
    const renderObj = this.state.selectedAlbum.name ? (
      <SingleAlbum album={this.state.selectedAlbum} />
    ) : (
      <Display albums={this.state.albums} getAlbum={this.getAlbum} />
    );

    return (
      <div className="container">
        <Sidebar getAlbum={this.getAlbum} />
        {renderObj}
      </div>
    );
  }
}

const Sidebar = ({ getAlbum }) => {
  console.log('in Sidebar ', getAlbum);
  return (
    <div id="albums" className="row wrap">
      <h3>
        <a onClick={() => getAlbum(0, false)}>Albums</a>
      </h3>
    </div>
  );
};

const Display = ({ albums, getAlbum }) => {
  console.log('in Display ', getAlbum);
  return (
    <div id="albums" className="row wrap">
      {albums.map((album) => (
        <AlbumDiv album={album} key={album.id} getAlbum={getAlbum} />
      ))}
    </div>
  );
};

const AlbumDiv = ({ album, getAlbum }) => {
  console.log('in AlbumDiv ', getAlbum);
  return (
    <div className="album">
      <a onClick={() => getAlbum(album.id)}>
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
