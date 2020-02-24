const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyUser = require('../utils/verifyUser.js');

const AnimalScheme = require('../models/AnimalSchema.js');
const AnimalModel = mongoose.connection.model('Animal', AnimalScheme);

router.get('/', (req, res, next) => {
  const { type, gender, page, limit } = req.query;
  const filter = {};
  const pagination = { page: 1, limit: 10 };

  type ? filter.type = type : '';
  gender ? filter.gender = gender : '';
  page ? pagination.page = page : '';
  limit ? pagination.limit = limit : '';

  AnimalModel
    .paginate(filter, { ...pagination, sort: { created: -1 } })
    .then(animals => {
      if (animals.page > animals.totalPages) {
        throw { status: 400, message: 'not found' };
      }
      res.status(200).json(animals);
    })
    .catch(err => {
      if (err.status === 400)
        res.status(400).json(err);
      else
        res.status(500).json(err);
    });
});

router.get('/:animalID', (req, res, next) => {
  AnimalModel.findById(new mongoose.Types.ObjectId(req.params.animalID))
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
  const { photos, name, type, gender, description, age } = req.body;
  const created = Date.now();

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  new AnimalModel({ _id: new mongoose.Types.ObjectId(), photos, name, type, gender, age, description, created })
    .save()
    .then(animal => {
      res.status(200).json(animal);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.put('/:animalID', (req, res, next) => {
  const { photos, name, type, gender, description, age } = req.body;

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  AnimalModel.findById(new mongoose.Types.ObjectId(req.params.animalID))
    .exec()
    .then(animal => {
      animal.photos = photos;
      animal.name = name;
      animal.type = type;
      animal.gender = gender;
      animal.age = age;
      animal.description = description;
      animal.save()
        .then(animal => {
          res.status(200).json(animal);
        })
        .catch(err => {
          console.log(err);
          res.status(500).end();
        });
    });
});

router.delete('/:animalID', (req, res, next) => {
  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  AnimalModel.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.animalID) })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;