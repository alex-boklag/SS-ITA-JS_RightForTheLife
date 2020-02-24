const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const HappyStorySchema = require('../../models/HappyStorySchema.js');
const connectionURI = require('../../utils/configs.js').connectionURI;

initHappyStories();

function readHappyStories() {
  return fs.readFileSync('./json-db/happy-stories.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initHappyStories() {
  const connection = getConnection();
  const HappyStoryModel = connection.model('HappyStory', HappyStorySchema);
  HappyStoryModel.insertMany(extractedHappyStories(HappyStoryModel))
    .then(() => {
      console.log('HappyStories collection created');
      connection.close();
    })
    .catch(err => console.log('save error\n' + err));
}

function extractedHappyStories(HappyStory) {
  const happyStoriesContent = JSON.parse(readHappyStories());
  const newHappyStories = [];
  for (happyStory of happyStoriesContent) {
    newHappyStories.push(new HappyStory({
      _id: new mongoose.Types.ObjectId(),
      date: happyStory.date,
      title: happyStory.title,
      photo: happyStory.photo,
      gallery: happyStory.gallery,
      videos: happyStory.videos,
      text: happyStory.text,
    }));
  }
  return newHappyStories;
}

module.exports = initHappyStories;