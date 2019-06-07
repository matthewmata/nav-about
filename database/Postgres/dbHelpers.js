const Restaurant = require('./models');

module.exports = {
  getAll: () => Restaurant.findAll({}),
  postOne: (name, address, phone, schedule, image, priceRange, id, ratings, categories) => {
    return Restaurant.countDocuments({})
    .then(id => {
      id += 1;
      Restaurant.create({ name, address, phone, schedule, image, priceRange, id, ratings, categories })
    })
  },
  deleteAll: () => Restaurant.destroy({}),
  getOne: (id) => Restaurant.findAll({ where: { id }}),
  deleteOne: (id) => Restaurant.destroy({ where: { id }}),
  updateOne: (id, name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.update({ name, address, phone, schedule, image, priceRange, ratings, categories }, { where: { id }})
}