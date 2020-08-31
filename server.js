const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const db = require('./db');


app.use(morgan('dev'));
app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.use((err, req, res, next) => {
    res.status(500).send( {error: err.message})
});

const port = process.env.PORT || 5000;

const init = () => {
    try {
        app.listen(port, ()=> 
            console.log(`listening on port: ${port}`)
        )
    } catch(err) {
        console.log(err);
    }
}

init();