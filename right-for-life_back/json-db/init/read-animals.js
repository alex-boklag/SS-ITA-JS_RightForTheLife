const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const connectionURI = require('../../utils/configs.js').connectionURI;
const AnimalSchema = require('../../models/AnimalSchema.js');

initAnimals();

function readAnimals() {
  return fs.readFileSync('./json-db/animals.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initAnimals() {
  const connection = getConnection();
  const AnimalModel = connection.model('Animal', AnimalSchema);
  AnimalModel.insertMany(extractedAnimals(AnimalModel))
    .then(() => {
      console.log('Animals collection created');
      connection.close();
    })
    .catch(err => console.log('save error\n' + err));
}

function extractedAnimals(Animal) {
  const animalsContent = JSON.parse(readAnimals());
  const newAnimals = [];
  for (animal of animalsContent) {
    newAnimals.push(new Animal({
      _id: new mongoose.Types.ObjectId(),
      name: animal.name,
      type: animal.type,
      gender: animal.gender,
      age: animal.age,
      photos: animal.photos,
      description: animal.description,
    }));
  }
  return newAnimals;
}

module.exports = initAnimals;