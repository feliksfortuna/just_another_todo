require('dotenv').config({path: '../.env'});

const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

require('./models/db.js');
require('./config/passport');

const apiRouter = require('./routes/api');

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(passport.initialize());

app.use('/api', apiRouter);

// this is the catch all route that will send the index.html file
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//     });

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({message: err.message});
    }
    });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    });