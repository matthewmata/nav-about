const fs = require('fs');
const path = require('path');
const dataGen = require('../../dataGen');

let writeStream = fs.createWriteStream(path.resolve(__dirname, './mongoData.json'));

console.time('Finished generating data');
const populate = async () => {
  for (let i = 1; i <= 10000000; i++) {
    if (!writeStream.write(JSON.stringify(dataGen(i)) + (i === 10000000 ? ']' : ','))) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
    if (i === 10000000) {
      console.timeEnd('Finished generating data');
    }
  }
};

writeStream.write('[', populate);

// mongoimport --db grubhub --collection restaurants --jsonArray --file /Users/matthew/Documents/HRLA29/nav-about/database/Mongo/streams/mongoData.json

