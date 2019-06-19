const Restaurant = require('./models');

module.exports = {
  getOneRandom: () => Restaurant.findAll({ where: { id }}),
  postOne: (name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.create({ name, address, phone, schedule, image, priceRange, ratings, categories }),
  deleteAll: () => Restaurant.destroy({ where: {}}),
  getOne: (id) => Restaurant.findAll({ where: { id }}),
  deleteOne: (id) => Restaurant.destroy({ where: { id }}),
  updateOne: (id, name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.update({ name, address, phone, schedule, image, priceRange, ratings, categories }, { where: { id }})
}