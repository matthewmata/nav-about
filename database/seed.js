const Restaurant = require("./models.js");
const db = require("./index.js");
const seedData = require("./seedData.json");

// Random Integer generator for seeder function
const randomInt = () => {
  return Math.floor(Math.random() * 100);
}

// Seeder function for 100 restaurants
const insertRestaurants = () => {
  Restaurant.insertMany(seedData)
  .then(() => console.log("Successfully seeded database!"))
  .catch(err => console.log("Could not seed :(", err));
};

insertRestaurants();