const fs = require('fs');
const path = require('path');
const dataGen = require('./dataGen');

let writeStream = fs.createWriteStream(path.resolve(__dirname, './mongoData.json'));

console.time('Finished generating data');
const populate = async () => {
  for (let i = 1; i <= 100; i++) {
    if (!writeStream.write(JSON.stringify(dataGen(i)) + (i === 100 ? ']' : ','))) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
    if (i === 100) {
      console.timeEnd('Finished generating data');
    }
  }
};

writeStream.write('[', populate);

// mongoimport --db grubhub --collection restaurants --jsonArray --file database/data/mongoSeedData/mongoData.json --numInsertionWorkers 8
// db.restaurants.createIndex({ id: 1 });

