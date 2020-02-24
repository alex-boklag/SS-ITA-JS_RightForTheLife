const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const verifyUser = require('../utils/verifyUser.js');

const AboutScheme = require('../models/AboutSchema.js');
const AboutModel = mongoose.connection.model('About', AboutScheme);

router.get('/', (req, res, next) => {
  AboutModel.findOne()
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    });
});

router.put('/', (req, res, next) => {
  const { gallery, description, instagram, facebook, phone, email, additionalContacts } = req.body;

  if (!verifyUser(JSON.parse(req.get('Authorization')))) res.status(401).end();

  AboutModel.findOne()
    .exec()
    .then(about => {
      about.gallery = gallery;
      about.description = description;
      about.instagram = instagram;
      about.facebook = facebook;
      about.phone = phone;
      about.email = email;
      about.additionalContacts = additionalContacts;
      about.save()
        .then(() => {
          res.status(200).json(about);
        })
        .catch(err => {
          console.log(err);
        });
    });
});

module.exports = router;