var mongoose = require('mongoose');

// 'mongodb://matthewmata1030:password@18.218.132.194/grubhub'
// 'mongodb://localhost/grubhub'
mongoose.connect('mongodb://matthewmata1030:password@18.218.132.194/grubhub', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log('Could not connect to database: ', err));
db.once('open', () => console.log('Connected to database! :D'));

module.exports = db;