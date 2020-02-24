const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const connectionURI = require('../../utils/configs.js').connectionURI;
const AboutSchema = require('../../models/AboutSchema.js');

initAbout();

function readAbout() {
  return fs.readFileSync('./json-db/about_us_info.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initAbout() {
  const connection = getConnection();
  const AboutModel = connection.model('About', AboutSchema);
  extractedAbout(AboutModel).save()
    .then(() => {
      console.log('About collection created');
      connection.close();
    })
    .catch(err => console.log('About save error\n' + err));
}

function extractedAbout(About) {
  const aboutContent = JSON.parse(readAbout());
  return new About({
    _id: new mongoose.Types.ObjectId(),
    gallery: aboutContent.gallery,
    description: aboutContent.description,
    instagram: aboutContent.instagram,
    facebook: aboutContent.facebook,
    phone: aboutContent.phone,
    email: aboutContent.email,
  });
}

module.exports = initAbout;