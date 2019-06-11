const data = require("../seedData.json");

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const dataGen = (id) => {
  let restaurant = {};
  restaurant.id = id
  restaurant.name = data[getRandomIntInclusive(0, 99)].name;
  restaurant.address = data[getRandomIntInclusive(0, 99)].address;
  restaurant.phone = data[getRandomIntInclusive(0, 99)].phone;
  restaurant.schedule = data[getRandomIntInclusive(0, 99)].schedule;
  restaurant.image = data[getRandomIntInclusive(0, 99)].image;
  restaurant.priceRange = data[getRandomIntInclusive(0, 99)].priceRange;
  restaurant.ratings = data[getRandomIntInclusive(0, 99)].ratings;
  restaurant.categories = data[getRandomIntInclusive(0, 99)].categories;

  return restaurant;
}

module.exports = dataGen;