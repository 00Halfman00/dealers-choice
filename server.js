const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const { Album, Artist, Song, conn } = require('./db/index');
const seed = require('./bin/seed');

//logging middleware
app.use(morgan('dev'));

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/albums', async (req, res, next) => {
  try {
    res.send(await Album.findAll({ include: [Artist] }));
  } catch (err) {
    next(err);
  }
});

app.get('/albums/:albumId', async (req, res, next) => {
  try {
    res.send(
      await Album.findByPk(req.params.albumId, { include: [Artist, Song] })
    );
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

const port = process.env.PORT || 5000;

const init = async () => {
  try {
    await seed();
    app.listen(port, () => console.log(`listening on port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

init();
