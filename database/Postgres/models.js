const Sequelize = require('sequelize');
const connection = require('./index');

const address = connection.define('address', {
  line1: Sequelize.STRING,
  line2: Sequelize.STRING,
  milesAway: Sequelize.INTEGER,
}, {
  timestamps: false
})

const restaurant = connection.define('restaurants', {
  id: Sequelize.INTEGER, 
  name: Sequelize.STRING,
  address: {
    line1: Sequelize.STRING,
    line2: Sequelize.STRING,
    milesAway: Sequelize.INTEGER,
  },       
  phone: Sequelize.STRING,
  ratings: {
    number: Sequelize.INTEGER,
    stars: Sequelize.INTEGER,
    good: Sequelize.INTEGER,
    timely: Sequelize.INTEGER,
    correct: Sequelize.INTEGER,
    sampleReview: {
      name: Sequelize.STRING,
      review: Sequelize.STRING,
    }
  },
  schedule: {
    monFri: {
		  delivery: Sequelize.STRING,
		  pickup: Sequelize.STRING
    },
		satSun: {
		  delivery: Sequelize.STRING,
		  pickup: Sequelize.STRING
    },
  },
  image: Sequelize.STRING,
  priceRange: Sequelize.INTEGER,
  categories: [Sequelize.STRING]
}, {
  timestamps: false
});

restaurant.hasOne(address)
address.belongsTo(restaurant);

Sequelize.sync();

module.exports = restaurant;