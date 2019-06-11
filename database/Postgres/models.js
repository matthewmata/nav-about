const Sequelize = require('sequelize');
const connection = require('./index');

const Restaurant = connection.define('restaurants', { 
  name: Sequelize.STRING,
  address: Sequelize.STRING,       
  phone: Sequelize.STRING,
  ratings: Sequelize.STRING,  
  schedule: Sequelize.STRING,
  image: Sequelize.STRING,
  pricerange: Sequelize.INTEGER,
  categories: Sequelize.STRING
}, {
  timestamps: false
});

Restaurant.sync();

module.exports = Restaurant;
