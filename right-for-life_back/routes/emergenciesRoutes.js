const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyUser = require('../utils/verifyUser.js');

const EmergencyScheme = require('../models/EmergencySchema.js');
const EmergencyModel = mongoose.connection.model('Emergency', EmergencyScheme);

router.get('/', (req, res, next) => {
  const pagination = { page: 1, limit: 10 };
  const { page, limit } = req.query;

  page ? pagination.page = page : '';
  limit ? pagination.limit = limit : '';

  EmergencyModel
    .paginate({}, { ...pagination, sort: { created: -1 } })
    .then(doc => {
      res.status(200).json(doc);
    });
});

router.get('/:emergencyID', (req, res, next) => {
  EmergencyModel.findById(new mongoose.Types.ObjectId(req.params.emergencyID))
    .exec()
    .then(doc => {
      if (doc)
        res.status(200).json(doc);
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

  new EmergencyModel({ _id: new mongoose.Types.ObjectId(), date, title, photo, text, gallery, videos, created })
    .save()
    .then(emergency => {
      res.status(200).json(emergency);
    })
    .catch(err => {
      console.log(err);
    });

});

router.put('/:emergencyID', (req, res, next) => {
  const { date, title, photo, text, gallery, videos } = req.body;

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  EmergencyModel.findById(new mongoose.Types.ObjectId(req.params.emergencyID))
    .exec()
    .then(emergency => {
      emergency.date = date;
      emergency.title = title;
      emergency.photo = photo;
      emergency.text = text;
      emergency.gallery = gallery;
      emergency.videos = videos;
      emergency.save()
        .then(() => {
          res.status(200).json(emergency);
        })
        .catch(err => {
          console.log(err);
        });
    });

});

router.delete('/:emergencyID', (req, res, next) => {
  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  EmergencyModel.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.emergencyID) })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;