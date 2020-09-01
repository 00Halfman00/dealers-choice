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
    const res = await axios.get('/albums/');
    this.setState({albums: res.data});
  }

  render() {
      //console.log(this.state.albums)
    return (
    <div>
    <Sidebar />
    <Display albums={this.state.albums}/>
    </div>
    )
  }
}

const Sidebar = () => {
  return (
    <div id="albums" className="row wrap">
      <a>Albums</a>
    </div>
  );
};

const Display = ({ albums }) => {
    console.log('in Display ', albums)
    return (
        <div id="albums" className="row wrap">
            {albums.map( album => 
                <AlbumDiv album={album} key={album.id} />
                )}
        </div>
    )
}

const AlbumDiv = ( { album }) => {
    console.log('in AlbumDiv ', album)
    return (
        <div className="album">
            <a>
                <img src={album.artworkUrl} />
                <p>{album.name}</p>
                <small>{album.artist.name}</small>
            </a>
        </div>
    )
}


ReactDOM.render(<Main />, document.getElementById('root'));
