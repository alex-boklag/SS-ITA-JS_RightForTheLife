const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AnimalScheme = require('../models/AnimalSchema.js');
const AnimalModel = mongoose.connection.model('Animal', AnimalScheme);


router.get('/', (req, res, next) => {
  if (req.query.type && req.query.gender) {
    const { type, gender } = req.query;
    AnimalModel.find({ type: type, gender: gender })
      .exec()
      .then(animals => {
        res.status(200).json(animals);
      });
  } else {
    AnimalModel.find()
      .exec()
      .then(animals => {
        res.status(200).json(animals);
      });
  }
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

  new AnimalModel({ _id: new mongoose.Types.ObjectId(), photos, name, type, gender, age, description })
    .save()
    .then(animal => {
      console.log(animal);
      res.status(200).json(animal);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.put('/:animalID', (req, res, next) => {
  const { photos, name, type, gender, description, age } = req.body;

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
          console.log(animal);
          res.status(200).json(animal);
        })
        .catch(err => {
          console.log(err);
          res.status(500).end();
        });
    });
})
;

router.delete('/:animalID', (req, res, next) => {
  AnimalModel.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.animalID) })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;