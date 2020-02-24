const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const connectionURI = require('../../utils/configs.js').connectionURI;
const EmergencySchema = require('../../models/EmergencySchema.js');

initEmergency();

function readEmergencies() {
  return fs.readFileSync('./json-db/emergency.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initEmergency() {
  const connection = getConnection();
  const EmergencyModel = connection.model('Emergency', EmergencySchema);
  EmergencyModel.insertMany(extractedEmergencies(EmergencyModel))
    .then(() => {
      console.log('Emergency collection created');
      connection.close();
    })
    .catch(err => console.log('save error\n' + err));
}

function extractedEmergencies(Animal) {
  const emergencyContent = JSON.parse(readEmergencies());
  const newEmergencies = [];
  for (emergency of emergencyContent) {
    newEmergencies.push(new Animal({
      _id: new mongoose.Types.ObjectId(),
      date: emergency.date,
      title: emergency.title,
      photo: emergency.photo,
      gallery: emergency.gallery,
      videos: emergency.videos,
      text: emergency.text,
    }));
  }
  return newEmergencies;
}

module.exports = initEmergency;