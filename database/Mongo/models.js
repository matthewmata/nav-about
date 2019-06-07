const mongoose = require('mongoose');

let restaurantSchema = new mongoose.Schema({
  id: Number, 
  name: String,
  address: {
    line1: String,
    line2: String,
    milesAway: Number,
  },       
  phone: String,
  ratings: {
    number: Number,
    stars: Number,
    good: Number,
    timely: Number,
    correct: Number,
    sampleReview: {
      name: String,
      review: String,
    }
  },
  schedule: {
    monFri: {
		  delivery: String,
		  pickup: String
    },
		satSun: {
		  delivery: String,
		  pickup: String
    },
  },
  image: String,
  priceRange: Number,
  categories: [String]
});

let Restaurant = mongoose.model('Restaurants', restaurantSchema);

module.exports = Restaurant;