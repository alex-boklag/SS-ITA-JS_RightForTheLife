const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyUser = require('../utils/verifyUser.js');

const DonateSchema = require('../models/DonateSchema.js');
const DonateModel = mongoose.connection.model('Donate', DonateSchema);

router.get('/', (req, res, next) => {
  DonateModel.findOne()
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    });
});

router.put('/', (req, res, next) => {
  const { title, manager, summary, paymentMethodsInfo, moneyTransferInfo, privat24Token } = req.body;

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  DonateModel.findOne()
    .exec()
    .then(donate => {
      donate.title = title;
      donate.manager = manager;
      donate.summary = summary;
      donate.paymentMethodsInfo = paymentMethodsInfo;
      donate.moneyTransferInfo = moneyTransferInfo;
      donate.privat24Token = privat24Token;
      paymentMethodsInfo.paymentMethods.forEach(el => {
        donate.paymentMethodsInfo.paymentMethods.create(el);
      });
      donate.save()
        .then(donate => {
          res.status(200).json(donate);
        })
        .catch(err => {
          console.log(err);
        });
    });
});

module.exports = router;