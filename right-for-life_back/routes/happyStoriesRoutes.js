const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyUser = require('../utils/verifyUser.js');

const HappyStoryScheme = require('../models/HappyStorySchema.js');
const HappyStoryModel = mongoose.connection.model('HappyStory', HappyStoryScheme);

router.get('/', (req, res, next) => {
  const pagination = { page: 1, limit: 10 };
  const { page, limit } = req.query;

  page ? pagination.page = page : '';
  limit ? pagination.limit = limit : '';

  HappyStoryModel
    .paginate({}, { ...pagination, sort: { created: -1 } })
    .then(stories => {
      res.status(200).json(stories);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:happyStoryID', (req, res, next) => {
  HappyStoryModel.findById(new mongoose.Types.ObjectId(req.params.happyStoryID))
    .exec()
    .then(story => {
      if (story)
        res.status(200).json(story);
      else
        throw { status: 400, message: 'not found' };
    })
    .catch(err => {
      if (err.status === 400)
        res.status(400).json(err);
      else
        res.status(500).json(err);
    });
});

router.post('/', (req, res, next) => {
  const { date, title, photo, text, gallery, videos } = req.body;
  const created = Date.now();

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  new HappyStoryModel({ _id: new mongoose.Types.ObjectId(), date, title, photo, text, gallery, videos, created })
    .save()
    .then(story => {
      res.status(200).json(story);
    })
    .catch(err => {
      console.log(err);
    });

});

router.put('/:happyStoryID', (req, res, next) => {
  const { date, title, photo, text, gallery, videos } = req.body;

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  HappyStoryModel.findById(new mongoose.Types.ObjectId(req.params.happyStoryID))
    .exec()
    .then(story => {
      story.date = date;
      story.title = title;
      story.photo = photo;
      story.text = text;
      story.gallery = gallery;
      story.videos = videos;
      story.save()
        .then(() => {
          res.status(200).json(story);
        })
        .catch(err => {
          console.log(err);
        });
    });
});

router.delete('/:happyStoryID', (req, res, next) => {
  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  HappyStoryModel.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.happyStoryID) })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
    });

});

module.exports = router;