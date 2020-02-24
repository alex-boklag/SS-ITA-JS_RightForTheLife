const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    gallery: Array,
    description: Array,
    instagram: String,
    facebook: String,
    phone: String,
    email: String,
    additionalContacts: String,
  });

module.exports = AboutSchema;