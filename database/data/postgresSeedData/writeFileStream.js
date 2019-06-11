const fs = require('fs');
const path = require('path');
const data = require('../seedData.json');

let writeStream = fs.createWriteStream(path.resolve(__dirname, './postgresData.csv'));

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

console.time('Finished generating data');
const populate = async () => {
  for (let i = 1; i <= 10000000; i += 1) {
    let line = '';
    line += data[getRandomIntInclusive(0, 99)].name + '| ';
    line += JSON.stringify(data[getRandomIntInclusive(0, 99)].address) + '| ';
    line += data[getRandomIntInclusive(0, 99)].phone + '| ';
    line += JSON.stringify(data[getRandomIntInclusive(0, 99)].schedule) + '| ';
    line += data[getRandomIntInclusive(0, 99)].image + '| ';
    line += data[getRandomIntInclusive(0, 99)].priceRange + '| ';
    line += JSON.stringify(data[getRandomIntInclusive(0, 99)].ratings) + '| ';
    line += JSON.stringify(data[getRandomIntInclusive(0, 99)].categories)

    if (!writeStream.write(line + '\n')) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
    if (i === 10000000) {
      console.timeEnd('Finished generating data');
    }
  }
};

writeStream.write(
  'name|address|phone|schedule|image|pricerange|ratings|categories\n', 
  () => populate()
)

// login to postgres shell
// create database grubhub
// \c grubhub
// copy restaurants(name,address,phone,schedule,image,pricerange,ratings,categories) FROM '/Users/matthew/Documents/HRLA29/nav-about/database/data/postgresSeedData/postgresData.csv' DELIMITER '|' CSV HEADER;