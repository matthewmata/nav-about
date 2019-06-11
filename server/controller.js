// Uncomment for MongoDB w/Mongoose
// const Restaurant = require('../database/Mongo/dbHelpers');

// Uncomment for Postgres w/Sequelize
const Restaurant = require('../database/Postgres/dbHelpers');

module.exports = {
  getOneRandom: (req, res) => {
    Restaurant.getOneRandom()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
  postOne: (req, res) => {
    let { name, address, phone, schedule, image, priceRange, ratings, categories } = req.body;
    Restaurant.postOne(name, address, phone, schedule, image, priceRange, ratings, categories)
    .then(() => res.status(201).send('Successful post.'))
    .catch(err => console.log('Could not Post One: ', err));
  },
  deleteAll: (req, res) => {
    Restaurant.deleteAll()
    .then(() => res.status(200).send('Deleted All'))
    .catch(err => res.status(404).send('Could not complete get request: ', err));
  },
  getOne: (req, res) => {
    let { id } = req.params;
    Restaurant.getOne(id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
  deleteOne: (req, res) => {
    let { id } = req.params;
    Restaurant.deleteOne(id)
    .then(() => res.status(200).send('Deleted One'))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
  updateOne: (req, res) => {
    let { id } = req.params;
    let{ name, address, phone, schedule, image, priceRange, ratings, categories } = req.body;
    Restaurant.updateOne(id, name, address, phone, schedule, image, priceRange, ratings, categories)
    .then(() => res.status(200).send('Updated One'))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
}
