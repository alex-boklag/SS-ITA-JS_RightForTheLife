const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Animal = require('../models/animalModel.js');

router.get('/', (req, res, next) => {
  Animal.find()
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    });
  // res.status(200).json({ message: 'animals GET' });
});

router.post('/', (req, res, next) => {
  const animal = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  };
  const newAnimal = new Animal(animal);
  newAnimal.save().then(result => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
  res.status(200).json({ message: 'animals POST', animal });

});

router.put('/:animalID', (req, res, next) => {
  const animalId = req.params.animalID;
  res.status(200).json({ animalId, message: 'animals PUT' });

});

router.delete('/:animalID', (req, res, next) => {
  const animalId = req.params.animalID;
  res.status(200).json({ message: 'animals DELETE', animalId });
});

module.exports = router;