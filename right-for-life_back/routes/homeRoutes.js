const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyUser = require('../utils/verifyUser.js');

const HomeScheme = require('../models/HomeSchema.js');
const HomeModel = mongoose.connection.model('Home', HomeScheme);

const EmergencyScheme = require('../models/EmergencySchema.js');
const EmergencyModel = mongoose.connection.model('Emergency', EmergencyScheme);

const NewsScheme = require('../models/NewsSchema.js');
const NewsModel = mongoose.connection.model('News', NewsScheme);

const HappyStoryScheme = require('../models/HappyStorySchema.js');
const HappyStoryModel = mongoose.connection.model('HappyStories', HappyStoryScheme);

router.get('/', (req, res, next) => {
  HomeModel.findOne()
    .populate({ path: 'news', select: '_id title photo' })
    .populate({ path: 'emergencies', select: '_id title photo' })
    .populate({ path: 'happyStories', select: '_id title photo' })
    .exec()
    .then(home => {
      res.status(200).json(home);
    });
});

router.put('/', (req, res, next) => {
  const { gallery, title, description } = req.body;

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  HomeModel.findOne()
    .exec()
    .then(doc => {
      doc.gallery = gallery;
      doc.title = title;
      doc.description = description;
      doc.save().then(() => {
        res.status(200).json(doc);
      });
    });
});

router.put('/pin-emergencies', (req, res, next) => {
  const emergencyId = new mongoose.Types.ObjectId(req.body._id);

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  HomeModel.findOne()
    .exec()
    .then(home => {
      EmergencyModel.findById(emergencyId)
        .exec()
        .then((emergency) => {
          if (!emergency) {
            throw { status: 400, message: 'emergency not found' };
          }
          home.emergencies = emergency;
          home.save()
            .then(() => {
              res.status(200).json(home);
            });
        })
        .catch(err => {
          if (err.status === 400)
            res.status(400).json(err);
          else
            res.status(500).json(err);
        });
    });
});

router.put('/pin-news', (req, res, next) => {
  const newsId = new mongoose.Types.ObjectId(req.body._id);

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  HomeModel.findOne()
    .exec()
    .then(home => {
      NewsModel.findById(newsId)
        .exec()
        .then((news) => {
          if (!news) {
            throw { status: 400, message: 'news not found' };
          }
          home.news = news;
          home.save()
            .then(() => {
              res.status(200).json(home);
            });
        })
        .catch(err => {
          if (err.status === 400)
            res.status(400).json(err);
          else
            res.status(500).json(err);
        });
    });
});

router.put('/pin-happyStories', (req, res, next) => {
  const storyId = new mongoose.Types.ObjectId(req.body._id);

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  HomeModel.findOne()
    .exec()
    .then(home => {
      HappyStoryModel.findById(storyId)
        .exec()
        .then((story) => {
          if (!story) {
            throw { status: 400, message: 'story not found' };
          }
          home.happyStories = story;
          home.save()
            .then(() => {
              res.status(200).json(home);
            });
        })
        .catch(err => {
          if (err.status === 400)
            res.status(400).json(err);
          else
            res.status(500).json(err);
        });
    });
});

module.exports = router;