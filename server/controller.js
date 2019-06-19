// Uncomment for MongoDB w/Mongoose
const Restaurant = require('../database/mongo/dbHelpers');

// Uncomment for Postgres w/Sequelize
// const Restaurant = require('../database/Postgres/dbHelpers');

// REDIS SETUP
const client = require('redis').createClient();

client.on('error', (err) => {
  console.log('Error in Redis: ', err);
})


module.exports = {
  getOneRandom: (req, res) => {
    // Randomizer for id
    
    // Random Popular id is 9,999,900 - 10,000,000
    const randomIdPopular = () => Math.floor(Math.random() * (10000000 - 9999900)) + 9000000;
    // Random id is 1 - 10,000,000
    const randomIdAll = () => Math.floor(Math.random() * 10000000) + 1
    // 30% chance to get random Popular id
    if (Math.random() > 0.7) {
      var restaurantId = randomIdPopular();
    // 70% chance to get random id
    } else {
      var restaurantId = randomIdAll();
    }
    
    client.get(restaurantId, (err, result) => {
      // Grabs from redis cache
      if (result) {
        res.status(200).send(JSON.parse(result))
      // Grabs from database and stores in cache for 0.6 secs
      } else {
        Restaurant.getOneRandom(restaurantId)
        .then(result => {
          client.setex(restaurantId, 0.6, JSON.stringify(result));
          res.status(200).send(result);
        })
        .catch(err => res.status(404).send(err))
      }
    })
  },
  postOne: (req, res) => {
    let { name, address, phone, schedule, image, priceRange, ratings, categories } = req.body;
    Restaurant.postOne(name, address, phone, schedule, image, priceRange, ratings, categories)
    .then(() => res.status(201).send('Successful post.'))
    .catch(err => console.log('Could not Post One: ', err));
  },
  deleteAll: (req, res) => {
    Restaurant.deleteAll()
    .then(() => res.status(200).send('Deleted All'))
    .catch(err => res.status(404).send('Could not complete get request: ', err));
  },
  getOne: (req, res) => {
    let { id } = req.params;
    Restaurant.getOne(id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(404).send(err))
  },
  deleteOne: (req, res) => {
    let { id } = req.params;
    Restaurant.deleteOne(id)
    .then(() => res.status(200).send('Deleted One'))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
  updateOne: (req, res) => {
    let { id } = req.params;
    let{ name, address, phone, schedule, image, priceRange, ratings, categories } = req.body;
    Restaurant.updateOne(id, name, address, phone, schedule, image, priceRange, ratings, categories)
    .then(() => res.status(200).send('Updated One'))
    .catch(err => res.status(404).send('Could not complete get request: ', err))
  },
}
