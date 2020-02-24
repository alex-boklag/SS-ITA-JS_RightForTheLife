const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = require('../utils/configs.js').jwt_secret;

const UserScheme = require('../models/UserSchema.js');
const UserModel = mongoose.connection.model('User', UserScheme);

router.post('/signup', (req, res) => {
  const { email, username, password } = req.body;

  if (req.body.hasOwnProperty('password') && req.body.hasOwnProperty('email')) {
    UserModel.find({ email }).exec()
      .then(user => {
        if (user.length > 0) {
          res.status(422).json({ error: 'invalid user data!' });
        } else {
          bcrypt.hash(password, 10, (errHash, hash) => {
            if (errHash) {
              console.log(errHash);
              res.status(500).json({ error: errHash });
            } else {
              new UserModel({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: hash,
                username: username,
              }).save()
                .then(() => {
                  res.status(200).json({ message: 'user created' });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({ error: 'some db error' });
                });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    return res.status(400).json({ error: 'no data' });
  }
});

router.post('/signin', (req, res) => {
  const { email, username, password } = req.body;

  if (email && password) {
    UserModel.findOne({ email })
      .then(user => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ username, password: user.password, email }, secret);
            res.status(200).json(token);
          }
          else {
            res.status(401).end();
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(401).end();
      });
  }
});

module.exports = router;