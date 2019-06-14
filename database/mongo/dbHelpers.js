const Restaurant = require('./models');

const randomId = () => Math.floor(Math.random() * (10000000 - 9000000 + 1)) + 9000000;

module.exports = {
  getOneRandom: () => Restaurant.find({ _id: randomId()}),
  postOne: (name, address, phone, schedule, image, priceRange, _id, ratings, categories) => {
    return Restaurant.countDocuments({})
    .then(_id => {
      _id += 1;
      Restaurant.create({ name, address, phone, schedule, image, priceRange, _id, ratings, categories })
    })
  },
  deleteAll: () => Restaurant.deleteMany({}),
  getOne: (_id) => Restaurant.find({ _id }).limit(1).maxTimeMS(30),
  deleteOne: (_id) => Restaurant.deleteOne({ _id }),
  updateOne: (_id, name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.updateOne({ _id }, { name, address, phone, schedule, image, priceRange, ratings, categories })
}