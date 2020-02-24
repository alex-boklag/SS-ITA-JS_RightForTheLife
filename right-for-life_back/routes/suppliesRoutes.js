const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyUser = require('../utils/verifyUser.js');

const SupplyScheme = require('../models/SupplySchema.js');
const SupplyModel = mongoose.connection.model('Supply', SupplyScheme);

router.get('/', (req, res, next) => {
  SupplyModel.find()
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    });
});

router.put('/', (req, res, next) => {
  const supplies = [...req.body];
  const newSupplies = [];

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  SupplyModel.deleteMany({})
    .exec()
    .then(() => {
      supplies.forEach(supplie => {
        newSupplies.push(new SupplyModel({
          _id: new mongoose.Types.ObjectId(),
          name: supplie.name,
          type: supplie.type,
          info: supplie.info,
        }));
      });
      SupplyModel.insertMany(newSupplies)
        .then(supplies => {
          res.status(200).json(supplies);
        })
        .catch(err => {
          console.log(`Error during saving:\n ${err}`);
          res.status(500).end();
        });
    })
    .catch(err => {
      console.log(`Error during deleting:\n ${err}`);
      res.status(500).end();
    });
});

module.exports = router;