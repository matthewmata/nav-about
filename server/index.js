const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/mongo/index.js');
const router = require('./router');
// require('newrelic');

// Creating server and port number
const PORT = 3000;
const app = express();

// Middleware
// app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static HTML file
app.use('/', express.static(path.resolve(__dirname, '../public')));

// Router to handle all requests
app.use('/api', router);

// Verifies and sets port on where server is listening at
app.listen(PORT, () => console.log('App is listening on PORT', PORT));

