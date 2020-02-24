const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    gallery: Array,
    title: String,
    description: String,
    emergencies: { type: mongoose.Schema.Types.ObjectId, ref: 'Emergency' },
    news: { type: mongoose.Schema.Types.ObjectId, ref: 'News' },
    happyStories: { type: mongoose.Schema.Types.ObjectId, ref: 'HappyStories' },
  });

module.exports = HomeSchema;