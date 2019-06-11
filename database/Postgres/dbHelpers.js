const Restaurant = require('./models');

const randomId = () => Math.floor(Math.random() * (10000000 - 9000000 + 1)) + 9000000;

module.exports = {
  getOneRandom: () => Restaurant.findAll({ where: { id: randomId() }}),
  postOne: (name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.create({ name, address, phone, schedule, image, priceRange, ratings, categories }),
  deleteAll: () => Restaurant.destroy({ where: {}}),
  getOne: (id) => Restaurant.findAll({ where: { id }}),
  deleteOne: (id) => Restaurant.destroy({ where: { id }}),
  updateOne: (id, name, address, phone, schedule, image, priceRange, ratings, categories) => Restaurant.update({ name, address, phone, schedule, image, priceRange, ratings, categories }, { where: { id }})
}