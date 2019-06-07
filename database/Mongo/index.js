var mongoose = require('mongoose');

// `mongodb+srv://kjhogan:${process.env.DB_PASSWORD}@cluster0-hvkil.mongodb.net/test?retryWrites=true`

mongoose.connect('mongodb://localhost/grubhub', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log('Could not connect to database: ', err));
db.once('open', () => console.log('Connected to database! :D'));

module.exports = db;