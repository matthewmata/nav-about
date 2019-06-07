const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/Mongo/index.js');
const router = require('./router');

// Creating server and port number
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static HTML file
app.use('/restaurants/nav_intro', express.static(path.resolve(__dirname, '../public')));

// Router to handle all requests
app.use('/api', router);

// Verifies and sets port on where server is listening at
app.listen(PORT, () => console.log('App is listening on PORT', PORT));

