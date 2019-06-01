const Restaurant = require('../database/models.js');

module.exports = {
  getAll: (req, res) => {
    Restaurant.find({})
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
  postOne: (req, res) => {
    let { name, address, phone, schedule, image, priceRange, ratings, categories } = req.body;
    Restaurant.countDocuments({})
    .then(id => {
      id += 1;
      Restaurant.create({ name, address, phone, schedule, image, priceRange, id, ratings, categories })
      .then(() => res.status(201).send('Successful post.'))
      .catch(err => res.status(404).send('Could not post: ', err));
    })
    .catch(err => console.log('Could not count DB: ', err));
  },
  deleteAll: (req, res) => {
    Restaurant.deleteMany({})
    .then(() => res.status(200).send(result))
    .catch(err => res.status(404).send('Could not complete get request: ', err));
  },
  getOne: (req, res) => {
    let { id } = req.params;
    Restaurant.find({ id })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
  deleteOne: (req, res) => {
    let { id } = req.params;
    Restaurant.deleteOne({ id })
    .then(() => res.status(200).send('Deleted One'))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
  updateOne: (req, res) => {
    let { id } = req.params;
    let{ name, address, phone, schedule, image, priceRange, ratings, categories } = req.body;
    Restaurant.updateOne({ name, address, phone, schedule, image, priceRange, ratings, categories }, { id })
    .then(() => res.status(200).send('Updated One'))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
}
