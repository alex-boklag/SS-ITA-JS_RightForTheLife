const mongoose = require('mongoose');
const fs = require('fs');
const dbOptions = require('../../utils/configs.js').dbOptions;
const connectionURI = require('../../utils/configs.js').connectionURI;
const NewsSchema = require('../../models/NewsSchema.js');

initNews();

function readNews() {
  return fs.readFileSync('./json-db/news.json', 'utf8');
}

function getConnection() {
  return mongoose.createConnection(connectionURI, dbOptions);
}

function initNews() {
  const connection = getConnection();
  const NewsModel = connection.model('News', NewsSchema);
  NewsModel.insertMany(extractedNews(NewsModel))
    .then(() => {
      console.log('News collection created');
      connection.close();
    })
    .catch(err => console.log('save error\n' + err));
}

function extractedNews(News) {
  const newsContent = JSON.parse(readNews());
  const newNews = [];
  for (news of newsContent) {
    newNews.push(new News({
      _id: new mongoose.Types.ObjectId(),
      date: news.date,
      title: news.title,
      photo: news.photo,
      gallery: news.gallery,
      videos: news.videos,
      text: news.text,
    }));
  }
  return newNews;
}

module.exports = initNews;