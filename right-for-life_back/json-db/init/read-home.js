const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const connectionURI = require('../../utils/configs.js').connectionURI;
const HomeSchema = require('../../models/HomeSchema.js');

initHome();

function readHome() {
  return fs.readFileSync('./json-db/home.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initHome() {
  const connection = getConnection();
  const HomeModel = connection.model('Home', HomeSchema);
  extractedHome(HomeModel).save()
    .then(() => {
      console.log('Home collection created');
      connection.close();
    })
    .catch(err => console.log('Home save error\n' + err));
}

function extractedHome(About) {
  const homeContent = JSON.parse(readHome());
  return new About({
    _id: new mongoose.Types.ObjectId(),
    gallery: homeContent.gallery,
    title: homeContent.title,
    description: homeContent.description,
  });
}

module.exports = initHome;