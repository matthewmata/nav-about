// Mongoose Implementation
const Restaurant = require('./models');
// Raw mongo, refactored _id to 1-10000000. mongoose wont query of _id of a preset number
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://ec2-18-218-132-194.us-east-2.compute.amazonaws.com';
let db;

mongo.connect(url,{ useNewUrlParser: true}, (err, client) => {
  if (err) {
    console.error(err);
    return;
  } else {
    db = client.db('grubhub');
  }
})

const randomId = () => Math.floor(Math.random() * (10000000 - 9000000 + 1)) + 9000000;

module.exports = {
  // Mongo
  getOneRandom: () => new Promise ((resolve, reject) => {
    console.log('in random')
    db.collection('restaurants').findOne({_id: randomId()}, (err, items) => {
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  }),
  getOne: (_id) => new Promise ((resolve, reject) => {
    console.log('in getOne', _id)
    db.collection('restaurants').findOne({ _id: Number(_id) }, (err, items) => {
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  }),
  // Mongoose, _id queries may be broken. Need to refactor to use raw mongo
  // getOneRandom: () => Restaurant.find({ _id: randomId()}),
  // getOne: (_id) => Restaurant.find({ _id }).limit(1).maxTimeMS(30),
  postOne: (name, address, phone, schedule, image, priceRange, _id, ratings, categories) => {
    return Restaurant.countDocuments({})
    .then(_id => {
      _id += 1;
      Restaurant.create({ name, address, phone, schedule, image, priceRange, _id, ratings, categories })
    })
  },
  deleteAll: () => Restaurant.deleteMany({}),
  deleteOne: (_id) => Restaurant.deleteOne({ _id }),
  updateOne: (_id, name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.updateOne({ _id }, { name, address, phone, schedule, image, priceRange, ratings, categories })
}