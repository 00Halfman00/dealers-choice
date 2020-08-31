const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/cmdKungFu_db'
);

//think of some models/views

const Album = conn.define('album', {
  name: {
    type: STRING,
    allowNull: false,
  },
  artworkUrl: {
    type: STRING,
    allowNull: false,
  },
});

const Artist = conn.define('artist', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

const Song = conn.define('song', {
  name: {
    type: STRING,
    allowNull: false,
  },
  audioUrl: {
    type: STRING,
  },

  genre: {
    type: STRING,
  },
});


Album.hasMany(Song);
Song.belongsTo(Album);
Artist.hasMany(Album);
Album.belongsTo(Artist);
Artist.hasMany(Song);
Song.belongsTo(Artist);


module.exports = {
    conn, Artist, Song, Album
}