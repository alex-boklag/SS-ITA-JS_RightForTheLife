const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

AnimalSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    gender: String,
    age: Number,
    photos: Array,
    description: String,
    created: Number,
  });

AnimalSchema.plugin(paginate);

module.exports = AnimalSchema;