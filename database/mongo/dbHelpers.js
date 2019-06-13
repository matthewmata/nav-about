const Restaurant = require('./models');

const randomId = () => Math.floor(Math.random() * (10000000 - 9000000 + 1)) + 9000000;

module.exports = {
  getOneRandom: () => Restaurant.find({ id: randomId()}),
  postOne: (name, address, phone, schedule, image, priceRange, id, ratings, categories) => {
    return Restaurant.countDocuments({})
    .then(id => {
      id += 1;
      Restaurant.create({ name, address, phone, schedule, image, priceRange, id, ratings, categories })
    })
  },
  deleteAll: () => Restaurant.deleteMany({}),
  getOne: (id) => Restaurant.find({ id }).limit(1).maxTimeMS(30),
  deleteOne: (id) => Restaurant.deleteOne({ id }),
  updateOne: (id, name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.updateOne({ id }, { name, address, phone, schedule, image, priceRange, ratings, categories })
}