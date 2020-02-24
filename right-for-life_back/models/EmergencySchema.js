const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const EmergencySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    date: Number,
    title: String,
    photo: String,
    gallery: Array,
    videos: Array,
    text: String,
    created: Number,
  });

EmergencySchema.plugin(paginate);

module.exports = EmergencySchema;