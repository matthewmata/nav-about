const Restaurant = require('./models');

module.exports = {
  getAll: () => Restaurant.find({}),
  postOne: (name, address, phone, schedule, image, priceRange, id, ratings, categories) => {
    return Restaurant.countDocuments({})
    .then(id => {
      id += 1;
      Restaurant.create({ name, address, phone, schedule, image, priceRange, id, ratings, categories })
    })
  },
  deleteAll: () => Restaurant.deleteMany({}),
  getOne: (id) => Restaurant.find({ id }),
  deleteOne: (id) => Restaurant.deleteOne({ id }),
  updateOne: (id, name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.updateOne({ id }, { name, address, phone, schedule, image, priceRange, ratings, categories })
}